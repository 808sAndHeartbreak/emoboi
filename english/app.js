(function () {
  "use strict";

  const cfg = window.ENGLISH_LEXICON_CONFIG || {};
  const SYSTEM_PROMPT = window.ENGLISH_LEXICON_SYSTEM_PROMPT || "";
  const STORAGE_KEY = "english_lexicon_history_v1";
  const MAX_HISTORY = 50;
  const MD_STREAM_THROTTLE_MS = 180;
  const MAX_WORD_LEN = 15;

  const MODEL_FAST = "deepseek-chat";

  const $ = (sel) => document.querySelector(sel);
  const el = {
    configBanner: $("#config-banner"),
    inputShell: $("#input-shell"),
    input: $("#word-input"),
    btnClearInput: $("#btn-clear-input"),
    charCount: $("#char-count"),
    suggestions: $("#input-suggestions"),
    helpCard: $("#help-card"),
    btnFast: $("#btn-fast"),
    btnAbort: $("#btn-abort"),
    err: $("#error-msg"),
    streamWrap: $("#stream-wrap"),
    streamHdrLabel: $("#stream-hdr-label"),
    streamWordHero: $("#stream-word-hero"),
    streamRaw: $("#stream-raw"),
    streamMd: $("#stream-md"),
    thinking: $("#thinking-panel"),
    thinkingLabel: $("#thinking-label"),
    status: $("#status-text"),
    historyList: $("#history-list"),
    historySearch: $("#history-search"),
    btnClearHistory: $("#btn-clear-history"),
    resultPanel: $("#result-panel"),
    resultWordHero: $("#result-word-hero"),
    resultMdWrap: $("#result-md-wrap"),
    resultTitle: $("#result-title"),
    btnExpandResult: $("#btn-expand-result"),
    btnStreamExpand: $("#btn-stream-expand"),
  };

  let abortCtl = null;
  let historyRecords = [];
  let lastResultWord = "";
  let lastResultText = "";
  let mdStreamTimer = null;
  let pendingMdText = "";
  let currentQueryWord = "";
  let resultExpanded = false;
  let streamExpanded = false;

  var LEXICON_LOG = "[English Lexicon API]";

  function logApi(tag, detail) {
    try {
      var fn = console.warn || console.log;
      fn.call(console, LEXICON_LOG, tag, detail || "");
    } catch (_) {}
  }

  function apiBase() {
    const b = (cfg.apiBase || "").trim().replace(/\/$/, "");
    return b || null;
  }

  function hostLooksLikeWorkersDev(base) {
    try {
      return /\.workers\.dev$/i.test(new URL(base).hostname);
    } catch (_) {
      return String(base).indexOf("workers.dev") !== -1;
    }
  }

  function isLikelyNetworkFailure(e, msg) {
    if (!e || e.name === "AbortError") return false;
    if (e.name === "TypeError") return true;
    var m = (msg || "").toLowerCase();
    return (
      m.indexOf("failed to fetch") !== -1 ||
      m.indexOf("networkerror") !== -1 ||
      m.indexOf("load failed") !== -1 ||
      m.indexOf("timed out") !== -1 ||
      m.indexOf("err_connection") !== -1 ||
      m.indexOf("network") !== -1
    );
  }

  function showConfigError() {
    if (el.configBanner) el.configBanner.hidden = false;
  }

  function hideConfigError() {
    if (el.configBanner) el.configBanner.hidden = true;
  }

  function validateInput(raw) {
    if (!raw || typeof raw !== "string") return { ok: false, msg: "请输入单词" };
    const w = raw.trim();
    if (!w.length) return { ok: false, msg: "单词不能为空" };
    if (w.length > MAX_WORD_LEN)
      return { ok: false, msg: "单词长度不能超过 " + MAX_WORD_LEN + " 个字母" };
    if (!/^[a-zA-Z\s'-]+$/.test(w)) return { ok: false, msg: "请输入有效的英文单词" };
    return { ok: true, word: w };
  }

  function setError(msg) {
    if (!el.err) return;
    el.err.textContent = msg || "";
    el.err.hidden = !msg;
    updateHelpVisibility();
    updateSuggestionsVisibility();
  }

  function loadHistory() {
    try {
      const s = localStorage.getItem(STORAGE_KEY);
      historyRecords = s ? JSON.parse(s) : [];
      if (!Array.isArray(historyRecords)) historyRecords = [];
      historyRecords = historyRecords
        .filter((r) => r && typeof r.word === "string" && typeof r.text === "string")
        .map((r) => ({
          id: Number(r.id) || Date.now(),
          word: r.word.slice(0, MAX_WORD_LEN).toLowerCase(),
          text: r.text,
          timestamp: Number(r.timestamp) || Date.now(),
        }));
    } catch {
      historyRecords = [];
    }
  }

  function saveHistory() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(historyRecords));
    } catch (_) {}
  }

  function formatTime(ts) {
    const d = Date.now() - ts;
    if (d < 60000) return "刚刚";
    if (d < 3600000) return Math.floor(d / 60000) + " 分钟前";
    if (d < 86400000) return Math.floor(d / 3600000) + " 小时前";
    if (d < 604800000) return Math.floor(d / 86400000) + " 天前";
    const dt = new Date(ts);
    return dt.getMonth() + 1 + " 月" + dt.getDate() + " 日";
  }

  function setupMarked() {
    if (window.marked && typeof marked.setOptions === "function") {
      marked.setOptions({
        gfm: true,
        breaks: true,
        headerIds: false,
        mangle: false,
      });
    }
  }

  function renderMarkdownInto(container, text) {
    if (!container) return;
    if (!window.marked || !window.DOMPurify) {
      container.textContent = text;
      return;
    }
    const html = window.marked.parse(text || "", { breaks: true });
    container.innerHTML = window.DOMPurify.sanitize(html);
  }

  function normalizeWordToken(v) {
    return String(v || "")
      .toLowerCase()
      .replace(/[`*_~]/g, "")
      .replace(/^[^a-z0-9]+|[^a-z0-9]+$/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function stripPrimarySectionWordLine(text, queryWord) {
    if (!text) return "";
    const target = normalizeWordToken(queryWord);
    if (!target) return text;
    const lines = String(text).split("\n");
    let secIdx = -1;
    for (let i = 0; i < lines.length; i++) {
      if (/^#{2,6}\s*1[\.、]?\s*\*\*?\s*主要义项/i.test(lines[i].trim())) {
        secIdx = i;
        break;
      }
    }
    if (secIdx < 0) return text;
    let candidate = -1;
    for (let i = secIdx + 1; i < lines.length; i++) {
      const t = lines[i].trim();
      if (!t) continue;
      if (/^#{2,6}\s+/.test(t)) break;
      candidate = i;
      break;
    }
    if (candidate < 0) return text;
    const plain = lines[candidate]
      .replace(/^\s*>\s*/, "")
      .replace(/\*\*/g, "")
      .replace(/__/g, "")
      .replace(/`/g, "")
      .trim();
    if (normalizeWordToken(plain) !== target) return text;
    lines.splice(candidate, 1);
    return lines.join("\n");
  }

  function setWordHero(elm, word) {
    if (!elm) return;
    const w = String(word || "").trim();
    elm.textContent = w;
    elm.hidden = !w;
  }

  function normalizeMorphologyInlineCode(text) {
    let t = String(text || "");
    t = t.replace(
      /(\*\*拆解：\*\*\s*)([a-zA-Z][a-zA-Z0-9]*-（[^）\n]+）)\s*([：:])/g,
      function (full, pre, label, colon) {
        if (full.indexOf("`") !== -1) return full;
        return pre + "`" + label + "`" + colon;
      }
    );
    t = t.replace(
      /^(\s*)([a-zA-Z][a-zA-Z0-9]*-（[^）\n]+）)\s*([：:])/gm,
      function (full, indent, label, colon) {
        if (full.indexOf("`") !== -1) return full;
        return indent + "`" + label + "`" + colon;
      }
    );
    return t;
  }

  function renderLexiconMarkdown(container, text, word) {
    const stripped = stripPrimarySectionWordLine(text, word);
    renderMarkdownInto(container, normalizeMorphologyInlineCode(stripped));
  }

  function flushMdStream() {
    if (mdStreamTimer) {
      clearTimeout(mdStreamTimer);
      mdStreamTimer = null;
    }
    if (pendingMdText !== "") {
      const shouldStickToBottom =
        el.streamMd.scrollHeight - el.streamMd.scrollTop - el.streamMd.clientHeight < 24;
      renderLexiconMarkdown(el.streamMd, pendingMdText, currentQueryWord);
      if (shouldStickToBottom) {
        el.streamMd.scrollTop = el.streamMd.scrollHeight;
      }
      pendingMdText = "";
    }
  }

  function scheduleStreamMarkdown(full) {
    pendingMdText = full;
    if (mdStreamTimer) return;
    mdStreamTimer = setTimeout(function () {
      mdStreamTimer = null;
      const shouldStickToBottom =
        el.streamMd.scrollHeight - el.streamMd.scrollTop - el.streamMd.clientHeight < 24;
      renderLexiconMarkdown(el.streamMd, pendingMdText, currentQueryWord);
      if (shouldStickToBottom) {
        el.streamMd.scrollTop = el.streamMd.scrollHeight;
      }
    }, MD_STREAM_THROTTLE_MS);
  }

  function updateCharUi() {
    const len = el.input.value.length;
    if (el.charCount) {
      el.charCount.textContent = len + "/" + MAX_WORD_LEN;
      el.charCount.classList.toggle("warn", len > Math.floor(MAX_WORD_LEN * 0.8));
    }
    if (el.btnClearInput) {
      const has = len > 0;
      el.btnClearInput.classList.toggle("visible", has);
      el.btnClearInput.tabIndex = has ? 0 : -1;
    }
  }

  function updateSuggestionsVisibility() {
    if (!el.suggestions) return;
    const focused = document.activeElement === el.input;
    const empty = el.input.value.length === 0;
    const noHist = historyRecords.length === 0;
    const noErr = el.err.hidden || !el.err.textContent;
    const show = empty && focused && noHist && !busy && noErr;
    el.suggestions.hidden = !show;
  }

  function updateHelpVisibility() {
    if (!el.helpCard) return;
    const noHist = historyRecords.length === 0;
    const noErr = el.err.hidden || !el.err.textContent;
    const notBusy = !busy;
    const streamHidden = el.streamWrap.hidden;
    el.helpCard.hidden = !(noHist && noErr && notBusy && streamHidden);
  }

  function clearHistoryPeek() {
    if (!el.historyList) return;
    el.historyList.querySelectorAll(".history-item--peek").forEach(function (node) {
      node.classList.remove("history-item--peek");
    });
  }

  function removeHistoryById(id) {
    historyRecords = historyRecords.filter(function (r) {
      return r.id !== id;
    });
    saveHistory();
    renderHistory();
    updateHelpVisibility();
    updateSuggestionsVisibility();
  }

  function renderHistory() {
    if (!el.historyList) return;
    const kw = (el.historySearch && el.historySearch.value) || "";
    const lower = kw.trim().toLowerCase();
    let list = historyRecords;
    if (lower) {
      list = historyRecords.filter((r) => r.word.toLowerCase().includes(lower));
    }
    el.historyList.innerHTML = "";
    if (!list.length) {
      const p = document.createElement("p");
      p.className = "history-empty";
      p.textContent = lower ? "没有匹配的条目" : "暂无历史";
      el.historyList.appendChild(p);
      return;
    }
    list.slice(0, 20).forEach((r) => {
      const wrap = document.createElement("div");
      wrap.className = "history-item";
      wrap.setAttribute("data-history-id", String(r.id));

      const main = document.createElement("button");
      main.type = "button";
      main.className = "history-item-main";
      main.innerHTML =
        '<span class="history-word">' +
        escapeHtml(r.word) +
        "</span>" +
        '<span class="history-meta">' +
        formatTime(r.timestamp) +
        "</span>";

      const delBtn = document.createElement("button");
      delBtn.type = "button";
      delBtn.className = "history-item-del";
      delBtn.setAttribute("aria-label", "删除此条历史");
      delBtn.textContent = "×";

      delBtn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        removeHistoryById(r.id);
      });

      main.addEventListener("click", function () {
        clearHistoryPeek();
        openResult(r.word, r.text);
      });

      let lpTimer = null;
      let longPressActivated = false;
      wrap.addEventListener(
        "touchstart",
        function () {
          longPressActivated = false;
          if (lpTimer) clearTimeout(lpTimer);
          lpTimer = setTimeout(function () {
            longPressActivated = true;
            wrap.classList.add("history-item--peek");
            if (navigator.vibrate) navigator.vibrate(12);
          }, 500);
        },
        { passive: true }
      );
      wrap.addEventListener(
        "touchmove",
        function () {
          if (lpTimer) clearTimeout(lpTimer);
          lpTimer = null;
        },
        { passive: true }
      );
      wrap.addEventListener(
        "touchend",
        function () {
          if (lpTimer) clearTimeout(lpTimer);
          lpTimer = null;
          if (longPressActivated) {
            longPressActivated = false;
            const swallow = function (ev) {
              ev.preventDefault();
              ev.stopImmediatePropagation();
              main.removeEventListener("click", swallow, true);
            };
            main.addEventListener("click", swallow, true);
          }
        },
        { passive: true }
      );

      wrap.appendChild(main);
      wrap.appendChild(delBtn);
      el.historyList.appendChild(wrap);
    });
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function pushHistory(word, text) {
    const id = Date.now();
    historyRecords.unshift({
      id,
      word: word.toLowerCase(),
      text,
      timestamp: id,
    });
    if (historyRecords.length > MAX_HISTORY) {
      historyRecords = historyRecords.slice(0, MAX_HISTORY);
    }
    saveHistory();
    renderHistory();
    updateHelpVisibility();
    updateSuggestionsVisibility();
  }

  async function streamChat({ model, userWord, signal, onDelta }) {
    const base = apiBase();
    if (!base) throw new Error("未配置 API：请编辑 english/config.js 中的 apiBase");

    const url = base + "/v1/chat/completions";
    const t0 = typeof performance !== "undefined" ? performance.now() : 0;
    logApi("fetch:start", {
      url: url,
      pageOrigin: location.origin,
      pageUrl: location.href,
      workersDevHost: hostLooksLikeWorkersDev(base),
    });

    let res;
    try {
      res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model,
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: userWord },
          ],
          stream: true,
        }),
        signal,
      });
    } catch (err) {
      var elapsed =
        typeof performance !== "undefined" ? Math.round(performance.now() - t0) : -1;
      logApi("fetch:error", {
        url: url,
        elapsedMs: elapsed,
        name: err && err.name,
        message: err && err.message,
        tip: "打开 F12 → Network，找到上述 url，查看 Status / (blocked) / 是否长时间 Pending。",
      });
      throw err;
    }

    logApi("fetch:response", {
      url: url,
      status: res.status,
      ok: res.ok,
      elapsedMs:
        typeof performance !== "undefined" ? Math.round(performance.now() - t0) : -1,
    });

    if (!res.ok) {
      const t = await res.text();
      let msg = t || res.statusText;
      try {
        const j = JSON.parse(t);
        if (j.error) msg = typeof j.error === "string" ? j.error : j.error.message || msg;
      } catch (_) {}
      throw new Error(msg || "请求失败 " + res.status);
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let full = "";
    const processSseLine = (line) => {
      const trimmed = line.trim();
      if (!trimmed.startsWith("data:")) return;
      const data = trimmed.slice(5).trim();
      if (data === "[DONE]") return;
      try {
        const json = JSON.parse(data);
        if (json.error) {
          const err = json.error;
          throw new Error(typeof err === "string" ? err : err.message || JSON.stringify(err));
        }
        const delta = json.choices && json.choices[0] && json.choices[0].delta;
        const piece = (delta && delta.content) || "";
        if (piece) {
          full += piece;
          onDelta(piece, full);
        }
      } catch (e) {
        if (e instanceof SyntaxError) return;
        throw e;
      }
    };

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        processSseLine(line);
      }
    }
    if (buffer.trim()) processSseLine(buffer);

    return full;
  }

  let busy = false;

  async function run() {
    if (busy) return;
    const v = validateInput(el.input.value);
    if (!v.ok) {
      setError(v.msg);
      return;
    }
    if (!apiBase()) {
      showConfigError();
      setError("请先在 config.js 中填写 Worker 地址");
      return;
    }
    hideConfigError();

    busy = true;
    flushMdStream();
    lastResultWord = "";
    lastResultText = "";
    currentQueryWord = v.word;
    setError("");
    abortCtl = new AbortController();

    el.btnFast.disabled = true;
    el.btnFast.classList.add("is-loading");
    el.btnFast.textContent = "查询中...";
    el.btnAbort.hidden = false;
    el.streamWrap.hidden = false;
    setStreamExpanded(false);
    if (el.btnStreamExpand) el.btnStreamExpand.hidden = false;
    el.thinking.hidden = false;
    el.streamRaw.hidden = false;
    el.streamMd.hidden = true;
    setWordHero(el.streamWordHero, v.word);
    el.streamRaw.textContent = "";
    el.streamMd.innerHTML = "";
    if (el.streamHdrLabel) el.streamHdrLabel.textContent = "实时分析中";
    if (el.thinkingLabel) {
      el.thinkingLabel.textContent = "快速分析中…";
    }
    el.status.textContent = "";

    updateHelpVisibility();
    updateSuggestionsVisibility();

    const model = MODEL_FAST;

    try {
      const fullText = await streamChat({
        model,
        userWord: v.word,
        signal: abortCtl.signal,
        onDelta: function (_piece, full) {
          el.thinking.hidden = true;
          if (full.length > 40) {
            el.streamRaw.hidden = true;
            el.streamMd.hidden = false;
            scheduleStreamMarkdown(full);
          } else {
            const shouldStickToBottom =
              el.streamRaw.scrollHeight - el.streamRaw.scrollTop - el.streamRaw.clientHeight <
              24;
            el.streamRaw.textContent = full;
            if (shouldStickToBottom) {
              el.streamRaw.scrollTop = el.streamRaw.scrollHeight;
            }
          }
        },
      });

      flushMdStream();

      if (!fullText || !String(fullText).trim()) {
        throw new Error("未收到模型正文，请重试或使用快速分析");
      }

      el.thinking.hidden = true;
      el.streamRaw.hidden = true;
      el.streamMd.hidden = false;
      renderLexiconMarkdown(el.streamMd, fullText, v.word);
      lastResultWord = v.word;
      lastResultText = fullText;
      pushHistory(v.word, fullText);
      if (el.streamHdrLabel) el.streamHdrLabel.textContent = "";
      el.status.textContent = "";
    } catch (e) {
      setWordHero(el.streamWordHero, "");
      if (e.name === "AbortError") {
        setError("已中止");
      } else {
        const msg = (e && e.message) || String(e);
        if (isLikelyNetworkFailure(e, msg)) {
          const base = apiBase() || "";
          const online = location.protocol === "https:" || location.protocol === "http:";
          const workersDev = hostLooksLikeWorkersDev(base);
          let lines = [];
          if (online) {
            lines.push(
              "无法连上 API 服务器（浏览器报网络/超时）。你当前是在线页面，不是 file:// 的问题。"
            );
          } else {
            lines.push(
              "无法连接 API。若当前是本地文件打开，请改用 https://emoboi.com/english/ 或本地 http 服务。"
            );
          }
          if (workersDev) {
            lines.push(
              "你的 apiBase 指向 *.workers.dev：在国内网络下经常出现连接超时。根治：在 Cloudflare 给该 Worker 绑定自定义域（如 https://api.emoboi.com），把 english/config.js 里 apiBase 改成该域名（见 workers/deepseek-proxy/README.md）。临时：换手机热点或 VPN。"
            );
          } else {
            lines.push(
              "请检查 config.js 的 apiBase 是否正确、本机网络与 DNS；仍失败可换网络或 VPN。F12 → Console 搜索 「English Lexicon API」 查看详细日志。"
            );
          }
          setError(lines.join(" "));
        } else {
          setError(msg || "分析失败");
        }
      }
      el.thinking.hidden = true;
      flushMdStream();
    } finally {
      busy = false;
      el.btnFast.disabled = false;
      el.btnFast.classList.remove("is-loading");
      el.btnFast.textContent = "查询";
      el.btnAbort.hidden = true;
      abortCtl = null;
      updateHelpVisibility();
      updateSuggestionsVisibility();
    }
  }

  function syncBodyOverflow() {
    if (el.resultPanel && !el.resultPanel.hidden) {
      document.body.style.overflow = resultExpanded ? "" : "hidden";
    } else if (streamExpanded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }

  function setStreamExpanded(expanded) {
    streamExpanded = !!expanded;
    if (el.streamWrap) {
      el.streamWrap.classList.toggle("stream-expanded", streamExpanded);
    }
    if (el.btnStreamExpand) {
      el.btnStreamExpand.setAttribute("title", streamExpanded ? "退出全屏阅读" : "全屏阅读");
      el.btnStreamExpand.setAttribute(
        "aria-label",
        streamExpanded ? "退出全屏阅读" : "全屏阅读"
      );
      const icon = streamExpanded ? "minimize" : "maximize";
      el.btnStreamExpand.innerHTML = '<i data-lucide="' + icon + '"></i>';
      if (window.lucide) window.lucide.createIcons();
    }
    syncBodyOverflow();
  }

  function openResult(word, text, _mode) {
    setStreamExpanded(false);
    el.resultTitle.textContent = "";
    setWordHero(el.resultWordHero, word);
    renderLexiconMarkdown(el.resultMdWrap, text, word);
    resultExpanded = true;
    if (el.resultPanel) {
      el.resultPanel.classList.add("expanded");
      el.resultPanel.hidden = false;
    }
    if (el.btnExpandResult) {
      el.btnExpandResult.setAttribute("title", "返回");
      el.btnExpandResult.setAttribute("aria-label", "返回");
      el.btnExpandResult.innerHTML = '<i data-lucide="minimize"></i>';
    }
    if (window.lucide) window.lucide.createIcons();
    syncBodyOverflow();
  }

  function closeResult() {
    resultExpanded = false;
    if (el.resultPanel) {
      el.resultPanel.classList.remove("expanded");
      el.resultPanel.hidden = true;
    }
    setWordHero(el.resultWordHero, "");
    syncBodyOverflow();
  }

  function syncHistorySearchTabIndex() {
    if (!el.historySearch) return;
    try {
      var mq = window.matchMedia("(max-width: 640px) and (hover: none)");
      el.historySearch.tabIndex = mq.matches ? -1 : 0;
    } catch (_) {
      el.historySearch.tabIndex = 0;
    }
  }

  function init() {
    setupMarked();

    if (!SYSTEM_PROMPT) {
      setError("提示词未加载，请检查 prompts.js");
    }
    if (!apiBase()) showConfigError();

    loadHistory();
    renderHistory();
    updateCharUi();
    syncHistorySearchTabIndex();
    try {
      var mqHist = window.matchMedia("(max-width: 640px) and (hover: none)");
      if (mqHist.addEventListener) mqHist.addEventListener("change", syncHistorySearchTabIndex);
      else if (mqHist.addListener) mqHist.addListener(syncHistorySearchTabIndex);
    } catch (_) {}
    updateHelpVisibility();
    updateSuggestionsVisibility();

    el.input.addEventListener("input", function () {
      updateCharUi();
      updateSuggestionsVisibility();
    });
    el.input.addEventListener("focus", function () {
      if (el.inputShell) el.inputShell.classList.add("focused");
      updateSuggestionsVisibility();
    });
    el.input.addEventListener("blur", function () {
      if (el.inputShell) el.inputShell.classList.remove("focused");
      setTimeout(updateSuggestionsVisibility, 120);
    });

    if (el.btnClearInput) {
      el.btnClearInput.addEventListener("click", function () {
        el.input.value = "";
        updateCharUi();
        el.input.focus();
        updateSuggestionsVisibility();
      });
    }

    document.querySelectorAll(".suggestion-item").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const w = btn.getAttribute("data-word");
        if (w) {
          el.input.value = w;
          updateCharUi();
          el.input.blur();
          updateSuggestionsVisibility();
        }
      });
    });

    const queryForm = document.getElementById("lexicon-query-form");
    if (queryForm) {
      queryForm.addEventListener("submit", function (e) {
        e.preventDefault();
        run();
      });
    }
    el.btnAbort.addEventListener("click", () => {
      if (abortCtl) abortCtl.abort();
    });
    if (el.btnStreamExpand) {
      el.btnStreamExpand.addEventListener("click", function () {
        setStreamExpanded(!streamExpanded);
      });
    }
    if (el.btnExpandResult) {
      el.btnExpandResult.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        closeResult();
      });
    }
    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      const menu = document.getElementById("english-fs-menu");
      const menuBtn = document.getElementById("english-menu-btn");
      if (menu && menu.classList.contains("active")) {
        menu.classList.remove("active");
        menu.setAttribute("aria-hidden", "true");
        if (menuBtn) menuBtn.setAttribute("aria-expanded", "false");
        document.body.classList.remove("english-menu-open");
        e.preventDefault();
        return;
      }
      if (el.resultPanel && !el.resultPanel.hidden) {
        closeResult();
        e.preventDefault();
        return;
      }
      if (streamExpanded) {
        setStreamExpanded(false);
        e.preventDefault();
      }
    });
    if (el.btnClearHistory) {
      el.btnClearHistory.addEventListener("click", function () {
        historyRecords = [];
        saveHistory();
        renderHistory();
        updateHelpVisibility();
        updateSuggestionsVisibility();
      });
    }
    if (el.historySearch) {
      el.historySearch.addEventListener("input", renderHistory);
    }
    document.addEventListener("click", function (e) {
      if (e.target.closest(".history-item")) return;
      clearHistoryPeek();
    });
    el.input.addEventListener("keydown", (e) => {
      if (e.isComposing) return;
      if (e.key === "Enter") {
        e.preventDefault();
        run();
      }
    });

    if (window.lucide) window.lucide.createIcons();

    (function initSiteMenu() {
      const btn = document.getElementById("english-menu-btn");
      const panel = document.getElementById("english-fs-menu");
      const closeBtn = document.getElementById("english-fs-close");
      if (!btn || !panel || !closeBtn) return;

      function openMenu() {
        panel.classList.add("active");
        panel.setAttribute("aria-hidden", "false");
        btn.setAttribute("aria-expanded", "true");
        document.body.classList.add("english-menu-open");
        if (window.lucide) window.lucide.createIcons();
      }

      function closeMenu() {
        panel.classList.remove("active");
        panel.setAttribute("aria-hidden", "true");
        btn.setAttribute("aria-expanded", "false");
        document.body.classList.remove("english-menu-open");
      }

      btn.addEventListener("click", function () {
        if (panel.classList.contains("active")) closeMenu();
        else openMenu();
      });
      closeBtn.addEventListener("click", closeMenu);
      panel.querySelectorAll('a.english-fs-link').forEach(function (a) {
        a.addEventListener("click", closeMenu);
      });
    })();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
