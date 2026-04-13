const routes = Array.isArray(window.ITINERARY_DETAILS) ? window.ITINERARY_DETAILS : [];
const travelPhotos = Array.isArray(window.TRAVEL_IMAGES) ? window.TRAVEL_IMAGES : [];

const routeTabs = document.querySelector("#route-tabs");
const routeMeta = document.querySelector("#route-meta");
const routeContent = document.querySelector("#route-content");

let activeRouteId = routes[0]?.id || "";

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

function renderRouteImages(routeId) {
  const images = travelPhotos.filter((photo) => typeof photo === "object" && matchImageToRoute(photo, routeId));
  if (!images.length) {
    return `<div class="route-image-empty">暂无该路线的关联图片。</div>`;
  }

  return `
    <div class="route-image-grid">
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

function renderRouteTabs() {
  routeTabs.innerHTML = routes
    .map((route) => {
      const active = route.id === activeRouteId ? "is-active" : "";
      return `<button type="button" class="tab-btn ${active}" data-route="${route.id}">${route.routeTitle}</button>`;
    })
    .join("");

  routeTabs.querySelectorAll("[data-route]").forEach((button) => {
    button.addEventListener("click", () => {
      activeRouteId = button.getAttribute("data-route") || "";
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
  routeMeta.textContent = `${route.fileName} · 共 ${days.length} 天行程段 · ${generals.length} 个基础信息段`;

  const summaryCard = `
    <article class="section-card">
      <header class="section-head">路线摘要</header>
      <div class="section-body markdown">
        ${renderMarkdown(route.summaryLines || [])}
      </div>
    </article>
  `;

  const imageCard = `
    <article class="section-card">
      <header class="section-head">路线关联图片</header>
      <div class="section-body">
        ${renderRouteImages(route.id)}
      </div>
    </article>
  `;

  const generalCards = generals
    .map(
      (section) => `
        <article class="section-card">
          <header class="section-head">${section.title}</header>
          <div class="section-body markdown">
            ${renderMarkdown(section.lines || [])}
          </div>
        </article>
      `
    )
    .join("");

  const dayCards = days
    .map(
      (day) => `
        <article class="section-card day-card">
          <header class="section-head">${day.title}</header>
          <div class="section-body markdown">
            ${renderMarkdown(day.lines || [])}
          </div>
        </article>
      `
    )
    .join("");

  routeContent.innerHTML = `${summaryCard}${imageCard}${generalCards}${dayCards}`;
}

function init() {
  if (!routes.length) {
    routeMeta.textContent = "暂无详细路线数据，请运行生成脚本。";
    return;
  }
  renderRouteTabs();
  renderRouteContent();
}

document.addEventListener("DOMContentLoaded", init);
