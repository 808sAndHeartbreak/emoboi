const routes = Array.isArray(window.ITINERARY_DETAILS) ? window.ITINERARY_DETAILS : [];
const travelPhotos = Array.isArray(window.TRAVEL_IMAGES) ? window.TRAVEL_IMAGES : [];

const routeTabs = document.querySelector("#route-tabs");
const routeMeta = document.querySelector("#route-meta");
const routeContent = document.querySelector("#route-content");
const expandAllBtn = document.querySelector("#expand-all-btn");
const collapseAllBtn = document.querySelector("#collapse-all-btn");
const heroSubtitle = document.querySelector("#hero-subtitle");

const defaultRouteId = routes.find((item) => item.id.includes("kanto"))?.id || routes[0]?.id || "";
let activeRouteId = defaultRouteId;

function escapeHtml(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function applyInlineMarkdown(line) {
  const escaped = escapeHtml(line);
  const withLinks = escaped.replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>');
  const withBold = withLinks.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  const withCode = withBold.replace(/`([^`]+)`/g, "<code>$1</code>");
  return withCode;
}

function normalizeRouteKey(value) {
  return String(value || "")
    .toLowerCase()
    .replaceAll("_", "-")
    .replaceAll(" ", "-")
    .replaceAll(/-?days/g, "")
    .trim();
}

function matchImageToRoute(photo, routeId) {
  const routeKey = normalizeRouteKey(routeId);
  const rawRoutes = Array.isArray(photo?.routes) ? photo.routes : [];
  if (!rawRoutes.length) {
    return false;
  }
  return rawRoutes.some((raw) => {
    const candidate = normalizeRouteKey(raw);
    return candidate === routeKey || routeKey.includes(candidate) || candidate.includes(routeKey);
  });
}

function getRouteImages(routeId) {
  return travelPhotos.filter((photo) => typeof photo === "object" && matchImageToRoute(photo, routeId));
}

function renderImageGallery(images) {
  if (!images.length) {
    return "";
  }

  const gridClassName = images.length === 1 ? "route-image-grid is-single" : "route-image-grid";

  return `
    <div class="${gridClassName}">
      ${images
        .map((img, index) => {
          const src = escapeHtml(img.src || "");
          const caption = escapeHtml(img.caption || `路线配图 ${index + 1}`);
          return `
            <a class="route-image-card" href="${src}" target="_blank" rel="noreferrer">
              <img src="${src}" alt="${caption}" loading="lazy" decoding="async">
              <p>${caption}</p>
            </a>
          `;
        })
        .join("")}
    </div>
  `;
}

function renderMarkdown(lines) {
  const blocks = [];
  let listItems = [];

  const flushList = () => {
    if (!listItems.length) {
      return;
    }
    blocks.push(`<ul>${listItems.map((item) => `<li>${item}</li>`).join("")}</ul>`);
    listItems = [];
  };

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();
    if (!line.trim()) {
      flushList();
      continue;
    }

    const listMatch = line.match(/^\s*-\s+(.+)$/);
    if (listMatch) {
      listItems.push(applyInlineMarkdown(listMatch[1]));
      continue;
    }

    flushList();
    blocks.push(`<p>${applyInlineMarkdown(line)}</p>`);
  }

  flushList();
  return blocks.join("");
}

function normalizeSections(route) {
  const sections = Array.isArray(route.sections) ? route.sections : [];
  const days = [];
  const generals = [];

  sections.forEach((section) => {
    if (/^D\d+/.test(section.title)) {
      days.push(section);
    } else {
      generals.push(section);
    }
  });

  return { days, generals };
}

function getRouteSwitchLabel(route) {
  if (route.id.includes("kanto")) {
    return "关东 7 天";
  }
  if (route.id.includes("kansai")) {
    return "关西 4 天";
  }
  return route.routeTitle;
}

function getRouteIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const route = params.get("route");
  return routes.some((item) => item.id === route) ? route : "";
}

function syncUrlState() {
  const url = new URL(window.location.href);
  url.searchParams.set("route", activeRouteId);
  window.history.replaceState({}, "", url);
}

function shouldSectionDefaultOpen(title, type) {
  if (type === "summary") {
    return true;
  }

  if (type === "images") {
    return false;
  }

  if (type === "general") {
    return ["出行准备", "住哪里最顺", "机场、住哪、吃哪", "为什么这样设计", "交通怎么安排", "天气查看", "票券怎么选", "伊豆分区和轨道看图版", "箱根主线看图版"].includes(title);
  }

  if (type === "day") {
    return /^D1/.test(title) || /^D2/.test(title);
  }

  return false;
}

function renderCollapsibleCard(title, body, options = {}) {
  const className = options.className ? ` ${options.className}` : "";
  const isOpen = options.open ? " open" : "";
  const isPinned = options.pinned ? ' data-pinned="true"' : "";
  const imageGallery = Array.isArray(options.images) && options.images.length
    ? `<div class="section-image-wrap">${renderImageGallery(options.images)}</div>`
    : "";
  return `
    <details class="section-card${className}"${isOpen}${isPinned}>
      <summary class="section-head"><span>${escapeHtml(title)}</span></summary>
      <div class="section-body${options.bodyClassName ? ` ${options.bodyClassName}` : ""}">
        ${body}
        ${imageGallery}
      </div>
    </details>
  `;
}

function getRouteSummary(route, days, generals) {
  return `${getRouteSwitchLabel(route)} · 共 ${days.length} 个行程段 · ${generals.length} 个补充信息块`;
}

function updatePageHeader(route) {
  if (heroSubtitle) {
    heroSubtitle.textContent = route.id.includes("kanto")
      ? "当前是关东 7 天完整版：东京轻松逛、箱根公共交通主线、伊豆 3 到 4 天深度安排。"
      : "当前是关西 4 天完整版：大阪进出、京都 2 天、奈良 2 天，整体保持慢节奏。";
  }

  document.title = `日本旅行详情｜${getRouteSwitchLabel(route)}`;
}

function setAllSections(open) {
  routeContent.querySelectorAll(".section-card").forEach((card) => {
    if (!open && card.dataset.pinned === "true") {
      card.open = true;
      return;
    }
    card.open = open;
  });
}

function renderRouteTabs() {
  routeTabs.innerHTML = routes
    .map((route) => {
      const active = route.id === activeRouteId ? "is-active" : "";
      return `<button type="button" class="tab-btn ${active}" data-route="${route.id}">${getRouteSwitchLabel(route)}</button>`;
    })
    .join("");

  routeTabs.querySelectorAll("[data-route]").forEach((button) => {
    button.addEventListener("click", () => {
      activeRouteId = button.getAttribute("data-route") || "";
      syncUrlState();
      renderRouteTabs();
      renderRouteContent();
    });
  });
}

function renderRouteContent() {
  const route = routes.find((item) => item.id === activeRouteId);
  if (!route) {
    routeMeta.textContent = "未找到路线数据";
    routeContent.innerHTML = "";
    return;
  }

  const { days, generals } = normalizeSections(route);
  updatePageHeader(route);
  routeMeta.textContent = getRouteSummary(route, days, generals);
  const routeImages = getRouteImages(route.id);

  const summaryCard = renderCollapsibleCard(
    "路线摘要",
    renderMarkdown(route.summaryLines || []),
    { bodyClassName: "markdown", open: shouldSectionDefaultOpen("路线摘要", "summary"), pinned: true }
  );

  const imageCard = routeImages.length
    ? renderCollapsibleCard("路线关联图片", renderImageGallery(routeImages), {
        open: shouldSectionDefaultOpen("路线关联图片", "images")
      })
    : "";

  const generalCards = generals
    .map(
      (section) =>
        renderCollapsibleCard(section.title, renderMarkdown(section.lines || []), {
          bodyClassName: "markdown",
          open: shouldSectionDefaultOpen(section.title, "general"),
          images: section.images || []
        })
    )
    .join("");

  const dayCards = days
    .map(
      (day) =>
        renderCollapsibleCard(day.title, renderMarkdown(day.lines || []), {
          className: "day-card",
          bodyClassName: "markdown",
          open: shouldSectionDefaultOpen(day.title, "day"),
          images: day.images || []
        })
    )
    .join("");

  routeContent.innerHTML = `${summaryCard}${imageCard}${generalCards}${dayCards}`;
}

function bindPanelActions() {
  expandAllBtn?.addEventListener("click", () => {
    setAllSections(true);
  });

  collapseAllBtn?.addEventListener("click", () => {
    setAllSections(false);
  });
}

function init() {
  if (!routes.length) {
    routeMeta.textContent = "暂无详细路线数据，请运行生成脚本。";
    return;
  }
  activeRouteId = getRouteIdFromUrl() || defaultRouteId;
  syncUrlState();
  bindPanelActions();
  renderRouteTabs();
  renderRouteContent();
}

document.addEventListener("DOMContentLoaded", init);
