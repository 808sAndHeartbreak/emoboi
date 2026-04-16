const routes = Array.isArray(window.ITINERARY_DETAILS) ? window.ITINERARY_DETAILS : [];

const directionTabs = document.querySelector("#direction-tabs");
const planTabs = document.querySelector("#plan-tabs");
const routeMeta = document.querySelector("#route-meta");
const routeContent = document.querySelector("#route-content");
const heroRouteTitle = document.querySelector("#hero-route-title");
const heroRouteSubtitle = document.querySelector("#hero-route-subtitle");

const preferredRouteId = "tokyo-izu-no-charter";
const preferredRoute = routes.find((route) => route.id === preferredRouteId) || routes[0];
const defaultDirectionId = preferredRoute?.directionId || "";
const defaultPlanId = preferredRoute?.planId || "";
let activeDirectionId = defaultDirectionId;
let activePlanId = defaultPlanId;

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

function renderMiniDetails(items) {
  const details = Array.isArray(items) ? items : [];
  if (!details.length) {
    return "";
  }

  return `
    <div class="subdetails">
      ${details
        .map((item) => {
          const isOpen = item.open ? " open" : "";
          const imageGallery = Array.isArray(item.images) && item.images.length
            ? `<div class="section-image-wrap">${renderImageGallery(item.images)}</div>`
            : "";
          return `
            <details class="mini-details"${isOpen}>
              <summary class="mini-summary">${escapeHtml(item.title || "补充信息")}</summary>
              <div class="mini-body markdown">
                ${renderMarkdown(item.lines || [])}
                ${imageGallery}
              </div>
            </details>
          `;
        })
        .join("")}
    </div>
  `;
}

function renderSectionNav(items) {
  const links = Array.isArray(items) ? items.filter(Boolean) : [];
  if (!links.length) {
    return "";
  }

  return `
    <div class="section-nav">
      ${links
        .map(
          (item) =>
            `<a class="nav-chip" href="#${escapeHtml(item.id)}" data-target="${escapeHtml(item.id)}">${escapeHtml(item.label)}</a>`
        )
        .join("")}
    </div>
  `;
}

function renderQuickNavCard(items) {
  const nav = renderSectionNav(items);
  if (!nav) {
    return "";
  }

  return `
    <section class="section-card quick-nav-card" data-pinned="true">
      <div class="section-body">
        <p class="quick-nav-label">快速跳转</p>
        ${nav}
      </div>
    </section>
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
  const leadSections = [];
  const middleSections = [];
  const tailSections = [];

  sections.forEach((section) => {
    if (/^D\d+/.test(section.title)) {
      days.push(section);
      return;
    }

    if (section.placement === "top") {
      leadSections.push(section);
      return;
    }

    if (section.placement === "tail") {
      tailSections.push(section);
      return;
    }

    middleSections.push(section);
  });

  middleSections.sort((a, b) => {
    const getPriority = (title) => {
      if (title.startsWith("东京")) {
        return 0;
      }
      if (title.startsWith("箱根")) {
        return 1;
      }
      if (title.startsWith("伊豆")) {
        return 2;
      }
      return 3;
    };
    return getPriority(a.title) - getPriority(b.title);
  });

  return { days, leadSections, middleSections, tailSections };
}

function getRouteSwitchLabel(route) {
  return route.planLabel || route.switchLabel || route.routeTitle;
}

function getDirectionOptions() {
  return Array.from(
    new Map(
      routes.map((route) => [
        route.directionId,
        { id: route.directionId, label: route.directionLabel || route.directionId }
      ])
    ).values()
  );
}

function getPlanOptions(directionId) {
  const preferredOrder = { "tokyo-izu-no-charter": 0, "tokyo-izu-charter": 1 };
  return Array.from(
    new Map(
      routes
        .filter((route) => route.directionId === directionId)
        .sort((a, b) => (preferredOrder[a.id] ?? 99) - (preferredOrder[b.id] ?? 99))
        .map((route) => [
          route.planId,
          { id: route.planId, label: route.planLabel || route.planId }
        ])
    ).values()
  );
}

function getRouteByState(directionId, planId) {
  return (
    routes.find((route) => route.directionId === directionId && route.planId === planId) ||
    routes.find((route) => route.directionId === directionId) ||
    routes[0]
  );
}

function getRouteFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const direction = params.get("direction");
  const plan = params.get("plan");
  if (direction && plan) {
    return getRouteByState(direction, plan);
  }
  const routeId = params.get("route");
  return routes.find((route) => route.id === routeId) || null;
}

function syncUrlState() {
  const url = new URL(window.location.href);
  url.searchParams.set("direction", activeDirectionId);
  url.searchParams.set("plan", activePlanId);
  url.searchParams.delete("route");
  window.history.replaceState({}, "", url);
}

function shouldSectionDefaultOpen(title, type) {
  if (type === "summary") {
    return true;
  }

  if (type === "general") {
    return false;
  }

  if (type === "day") {
    return false;
  }

  return false;
}

function renderCollapsibleCard(title, body, options = {}) {
  const className = options.className ? ` ${options.className}` : "";
  const isOpen = options.open ? " open" : "";
  const isPinned = options.pinned ? ' data-pinned="true"' : "";
  const anchorId = options.anchorId ? ` id="${escapeHtml(options.anchorId)}"` : "";
  const nestedDetails = renderMiniDetails(options.subDetails || []);
  const sectionNav = renderSectionNav(options.navItems || []);
  const imageGallery = Array.isArray(options.images) && options.images.length
    ? `<div class="section-image-wrap">${renderImageGallery(options.images)}</div>`
    : "";
  return `
    <details class="section-card${className}"${isOpen}${isPinned}${anchorId}>
      <summary class="section-head"><span>${escapeHtml(title)}</span></summary>
      <div class="section-body${options.bodyClassName ? ` ${options.bodyClassName}` : ""}">
        ${body}
        ${sectionNav}
        ${nestedDetails}
        ${imageGallery}
      </div>
    </details>
  `;
}

function getRouteSummary(route, days) {
  return route.metaText || `${getRouteSwitchLabel(route)} · 共 ${days.length} 个行程段`;
}

function updatePageHeader(route) {
  document.title = `日本旅行详情｜${route.routeTitle || getRouteSwitchLabel(route)}`;
  if (heroRouteTitle) {
    heroRouteTitle.textContent = route.routeTitle || getRouteSwitchLabel(route);
  }
  if (heroRouteSubtitle) {
    heroRouteSubtitle.textContent = route.heroSubtitle || "";
  }
}

function renderDirectionTabs() {
  const directions = getDirectionOptions();
  directionTabs.innerHTML = directions
    .map((direction) => {
      const active = direction.id === activeDirectionId ? "is-active" : "";
      return `<button type="button" class="tab-btn tab-btn-direction ${active}" data-direction="${direction.id}">${escapeHtml(direction.label)}</button>`;
    })
    .join("");

  directionTabs.querySelectorAll("[data-direction]").forEach((button) => {
    button.addEventListener("click", () => {
      activeDirectionId = button.getAttribute("data-direction") || "";
      const plans = getPlanOptions(activeDirectionId);
      if (!plans.some((plan) => plan.id === activePlanId)) {
        activePlanId = plans[0]?.id || "";
      }
      syncUrlState();
      renderDirectionTabs();
      renderPlanTabs();
      renderRouteContent();
    });
  });
}

function renderPlanTabs() {
  const plans = getPlanOptions(activeDirectionId);
  planTabs.innerHTML = plans
    .map((plan) => {
      const active = plan.id === activePlanId ? "is-active" : "";
      return `<button type="button" class="tab-btn tab-btn-plan ${active}" data-plan="${plan.id}">${escapeHtml(plan.label)}</button>`;
    })
    .join("");

  planTabs.querySelectorAll("[data-plan]").forEach((button) => {
    button.addEventListener("click", () => {
      activePlanId = button.getAttribute("data-plan") || "";
      syncUrlState();
      renderPlanTabs();
      renderRouteContent();
    });
  });
}

function renderRouteContent() {
  const route = getRouteByState(activeDirectionId, activePlanId);
  if (!route) {
    routeMeta.textContent = "未找到路线数据";
    routeContent.innerHTML = "";
    return;
  }

  const { days, leadSections, middleSections, tailSections } = normalizeSections(route);
  updatePageHeader(route);
  routeMeta.textContent = getRouteSummary(route, days);

  let sectionIndex = 0;
  const withAnchorId = (section, prefix) => ({
    ...section,
    anchorId: `${prefix}-${sectionIndex++}`
  });

  const anchoredLeadSections = leadSections.map((section) => withAnchorId(section, "lead"));
  const anchoredMiddleSections = middleSections.map((section) => withAnchorId(section, "middle"));
  const anchoredDays = days.map((section) => withAnchorId(section, "day"));
  const anchoredTailSections = tailSections.map((section) => withAnchorId(section, "tail"));

  const navItems = [
    ...anchoredMiddleSections
      .filter(
        (section) =>
          section.title.startsWith("东京") ||
          section.title.startsWith("箱根") ||
          section.title.startsWith("伊豆")
      )
      .map((section) => ({ id: section.anchorId, label: section.title })),
    ...anchoredDays.map((section) => ({
      id: section.anchorId,
      label: section.title.match(/^D\d+/)?.[0] || section.title
    })),
    ...anchoredTailSections
      .filter((section) => section.title.includes("Google Map") || section.title.includes("收藏地点"))
      .map((section) => ({ id: section.anchorId, label: "待收藏地点" })),
    ...anchoredTailSections
      .filter((section) => section.title.includes("参考") || section.title.includes("链接"))
      .map((section) => ({ id: section.anchorId, label: "官方链接" }))
  ];

  const summaryCard = renderCollapsibleCard(
    "方案摘要",
    renderMarkdown(route.summaryLines || []),
    {
      bodyClassName: "markdown",
      open: shouldSectionDefaultOpen("路线摘要", "summary"),
      pinned: true
    }
  );

  const quickNavCard = renderQuickNavCard(navItems);

  const leadCards = anchoredLeadSections
    .map(
      (section) =>
        renderCollapsibleCard(section.title, renderMarkdown(section.lines || []), {
          bodyClassName: "markdown",
          open: shouldSectionDefaultOpen(section.title, "general"),
          images: section.images || [],
          subDetails: section.subDetails || [],
          anchorId: section.anchorId
        })
    )
    .join("");

  const middleCards = anchoredMiddleSections
    .map(
      (section) =>
        renderCollapsibleCard(section.title, renderMarkdown(section.lines || []), {
          bodyClassName: "markdown",
          open: shouldSectionDefaultOpen(section.title, "general"),
          images: section.images || [],
          subDetails: section.subDetails || [],
          anchorId: section.anchorId
        })
    )
    .join("");

  const dayCards = anchoredDays
    .map(
      (day) =>
        renderCollapsibleCard(day.title, renderMarkdown(day.lines || []), {
          className: "day-card",
          bodyClassName: "markdown",
          open: shouldSectionDefaultOpen(day.title, "day"),
          images: day.images || [],
          subDetails: day.subDetails || [],
          anchorId: day.anchorId
        })
    )
    .join("");

  const tailCards = anchoredTailSections
    .map(
      (section) =>
        renderCollapsibleCard(section.title, renderMarkdown(section.lines || []), {
          bodyClassName: "markdown",
          open: shouldSectionDefaultOpen(section.title, "general"),
          images: section.images || [],
          subDetails: section.subDetails || [],
          anchorId: section.anchorId
        })
    )
    .join("");

  routeContent.innerHTML = `${summaryCard}${quickNavCard}${leadCards}${middleCards}${dayCards}${tailCards}`;
}

function bindRouteInteractions() {
  routeContent?.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-target]");
    if (!trigger) {
      return;
    }

    event.preventDefault();
    const targetId = trigger.getAttribute("data-target");
    if (!targetId) {
      return;
    }

    const target = document.getElementById(targetId);
    if (!target) {
      return;
    }

    if (target.tagName === "DETAILS") {
      target.open = true;
    }

    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

function init() {
  if (!routes.length) {
    routeMeta.textContent = "暂无详细路线数据，请运行生成脚本。";
    return;
  }
  const initialRoute = getRouteFromUrl() || preferredRoute || routes[0];
  activeDirectionId = initialRoute?.directionId || defaultDirectionId;
  activePlanId = initialRoute?.planId || defaultPlanId;
  syncUrlState();
  bindRouteInteractions();
  renderDirectionTabs();
  renderPlanTabs();
  renderRouteContent();
}

document.addEventListener("DOMContentLoaded", init);
