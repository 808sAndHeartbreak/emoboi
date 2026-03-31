(function () {
  "use strict";

  const cfg = window.ENGLISH_LEXICON_CONFIG || {};
  const SYSTEM_PROMPT = window.ENGLISH_LEXICON_SYSTEM_PROMPT || "";
  const STORAGE_KEY = "english_lexicon_history_v1";
  const MAX_HISTORY = 50;
  const MD_STREAM_THROTTLE_MS = 180;

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
    streamRaw: $("#stream-raw"),
    streamMd: $("#stream-md"),
    thinking: $("#thinking-panel"),
    thinkingLabel: $("#thinking-label"),
    status: $("#status-text"),
    historyList: $("#history-list"),
    historySearch: $("#history-search"),
    resultPanel: $("#result-panel"),
    resultMdWrap: $("#result-md-wrap"),
    resultTitle: $("#result-title"),
    btnCloseResult: $("#btn-close-result"),
  };

  let abortCtl = null;
  let historyRecords = [];
  let lastResultWord = "";
  let lastResultText = "";
  let mdStreamTimer = null;
  let pendingMdText = "";

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
    if (w.length > 20) return { ok: false, msg: "单词长度不能超过 20 个字符" };
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
          word: r.word.slice(0, 20).toLowerCase(),
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

  function flushMdStream() {
    if (mdStreamTimer) {
      clearTimeout(mdStreamTimer);
      mdStreamTimer = null;
    }
    if (pendingMdText !== "") {
      renderMarkdownInto(el.streamMd, pendingMdText);
      el.streamMd.scrollTop = el.streamMd.scrollHeight;
      pendingMdText = "";
    }
  }

  function scheduleStreamMarkdown(full) {
    pendingMdText = full;
    if (mdStreamTimer) return;
    mdStreamTimer = setTimeout(function () {
      mdStreamTimer = null;
      renderMarkdownInto(el.streamMd, pendingMdText);
      el.streamMd.scrollTop = el.streamMd.scrollHeight;
    }, MD_STREAM_THROTTLE_MS);
  }

  function updateCharUi() {
    const len = el.input.value.length;
    if (el.charCount) {
      el.charCount.textContent = len + "/20";
      el.charCount.classList.toggle("warn", len > 16);
    }
    if (el.btnClearInput) {
      el.btnClearInput.classList.toggle("visible", len > 0);
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
      const div = document.createElement("button");
      div.type = "button";
      div.className = "history-item";
      div.innerHTML =
        '<span class="history-word">' +
        escapeHtml(r.word) +
        "</span>" +
        '<span class="history-meta">' +
        formatTime(r.timestamp) +
        "</span>";
      div.addEventListener("click", () => openResult(r.word, r.text));
      el.historyList.appendChild(div);
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
    setError("");
    abortCtl = new AbortController();

    el.btnFast.disabled = true;
    el.btnFast.classList.add("is-loading");
    el.btnFast.textContent = "查询中...";
    el.btnAbort.hidden = false;
    el.streamWrap.hidden = false;
    el.thinking.hidden = false;
    el.streamRaw.hidden = false;
    el.streamMd.hidden = true;
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
            el.streamRaw.textContent = full;
            el.streamRaw.scrollTop = el.streamRaw.scrollHeight;
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
      renderMarkdownInto(el.streamMd, fullText);
      lastResultWord = v.word;
      lastResultText = fullText;
      pushHistory(v.word, fullText);
      if (el.streamHdrLabel) el.streamHdrLabel.textContent = "📋 分析结果";
      el.status.textContent = "完成";
    } catch (e) {
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

  function openResult(word, text, _mode) {
    el.resultTitle.textContent = word;
    renderMarkdownInto(el.resultMdWrap, text);
    el.resultPanel.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeResult() {
    el.resultPanel.hidden = true;
    document.body.style.overflow = "";
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

    el.btnFast.addEventListener("click", () => run());
    el.btnAbort.addEventListener("click", () => {
      if (abortCtl) abortCtl.abort();
    });
    el.btnCloseResult.addEventListener("click", closeResult);
    if (el.historySearch) {
      el.historySearch.addEventListener("input", renderHistory);
    }
    el.input.addEventListener("keydown", (e) => {
      if (e.isComposing) return;
      if (e.key === "Enter") run();
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
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && panel.classList.contains("active")) closeMenu();
      });
    })();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
