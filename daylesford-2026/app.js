(() => {
  "use strict";

  const storageKey = "daylesford-2026-checklist-v1";
  const statusStyles = { confirmed: "confirmed", planned: "suggested", optional: "optional" };
  const statusLabels = { confirmed: "已确认 / 已订", planned: "建议安排", optional: "可选" };
  const svgNS = "http://www.w3.org/2000/svg";
  let checklistState = {};
  let storageAvailable = true;
  let checklistItems = [];

  const $ = (selector) => document.querySelector(selector);
  const text = (value) => Array.isArray(value) ? value.filter(Boolean).join("\n") : String(value ?? "");
  function element(tag, className, value) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (value !== undefined && value !== null) node.textContent = text(value);
    return node;
  }
  function safeUrl(value) {
    if (!value) return null;
    try {
      const url = new URL(value, window.location.href);
      return ["http:", "https:"].includes(url.protocol) ? url.href : null;
    } catch { return null; }
  }
  function link(value, label, className) {
    const url = safeUrl(value);
    if (!url) return null;
    const node = element("a", className, label);
    node.href = url;
    node.target = "_blank";
    node.rel = "noopener noreferrer";
    return node;
  }
  function routeIcon() {
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("aria-hidden", "true");
    const path = document.createElementNS(svgNS, "path");
    path.setAttribute("d", "M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1 1 16 0Z M15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z");
    svg.append(path);
    return svg;
  }
  function mapLink(url, address, label = "地图导航") {
    const target = url || (address ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}` : null);
    const node = link(target, "", "route-link");
    if (node) node.append(routeIcon(), element("span", "", label));
    return node;
  }
  function badge(status = "planned", label) {
    const style = statusStyles[status] || "suggested";
    return element("span", `status-badge ${style}`, label || statusLabels[status] || statusLabels.planned);
  }
  function appendNotes(parent, notes, className = "item-notes") {
    if (!notes || !notes.length) return;
    parent.append(element("p", className, notes));
  }
  function dateParts(value) {
    const match = String(value || "").match(/^(\d{4})-(\d{2})-(\d{2})/);
    return match ? { month: match[2], day: match[3] } : null;
  }
  function dateHeading(value) {
    const parts = dateParts(value);
    return parts ? `${Number(parts.month)} 月 ${Number(parts.day)} 日` : text(value);
  }
  function setMultilineHeading(node, value) {
    let lines = text(value).split("\n");
    const bilingual = lines.length === 1 && lines[0].match(/^([A-Za-z][A-Za-z\s&.'-]*)\s+([\u3400-\u9fff].+)$/);
    if (bilingual) lines = [bilingual[1].trim(), bilingual[2]];
    node.replaceChildren();
    lines.forEach((line, index) => {
      if (index) node.append(document.createElement("br"));
      node.append(index ? element("em", "", line) : document.createTextNode(line));
    });
  }

  function renderHero(trip = {}) {
    if (trip.title) {
      setMultilineHeading($("#trip-title"), trip.title);
      document.title = `${text(trip.title).replace(/\n/g, "")}｜Daylesford 2026`;
    }
    if (trip.eyebrow) $(".hero-copy > .eyebrow").textContent = text(trip.eyebrow);
    if (trip.subtitle) $("#trip-subtitle").textContent = text(trip.subtitle);
    const start = dateParts(trip.startDate), end = dateParts(trip.endDate);
    if (start && end) $(".hero-date > span").textContent = `${start.day} — ${end.day}`;
    if (trip.dateLabel) $(".hero-date small").textContent = text(trip.dateLabel);
    const highlights = Array.isArray(trip.highlights) ? trip.highlights : [];
    if (highlights.length) {
      $(".hero-chips").replaceChildren(...highlights.map((entry) => element("span", "", [entry.value, entry.label].filter(Boolean).join(" · "))));
    } else if (trip.group) {
      $(".hero-chips").replaceChildren(element("span", "", trip.group));
    }
    if (trip.updatedAt) $("#updated-label").textContent = `最后更新 ${text(trip.updatedAt)}`;
    const intro = element("aside", "trip-intro");
    intro.setAttribute("aria-label", "三天安排概览");
    const introList = element("ol", "intro-list");
    (trip.intro || []).forEach((entry) => introList.append(element("li", "", entry)));
    if (introList.children.length) intro.append(introList);
    const meta = [trip.group, trip.timezone].filter(Boolean).join(" · ");
    if (meta) intro.append(element("p", "intro-meta", meta));
    if (intro.children.length) $("#load-notice").after(intro);
  }

  function renderStay(stay = {}) {
    const card = element("article", "stay-card");
    const copy = element("div", "stay-copy");
    copy.append(badge(stay.status, stay.statusLabel), element("h3", "", stay.name || "住宿"));
    if (stay.dates) copy.append(element("p", "stay-caption", stay.dates));
    if (stay.address) copy.append(element("address", "", stay.address));
    const links = element("div", "item-links");
    const map = mapLink(stay.mapUrl, stay.address, "导航到住宿");
    const website = link(stay.website, "住宿官网", "route-link");
    if (map) links.append(map);
    if (website) links.append(website);
    if (links.children.length) copy.append(links);
    card.append(copy);
    if (stay.checkIn || stay.checkOut) {
      const dates = element("div", "stay-dates");
      [["入住", stay.checkIn], ["退房", stay.checkOut]].forEach(([label, value]) => {
        if (!value) return;
        const part = element("div", "");
        part.append(element("span", "", label), element("strong", "", value));
        dates.append(part);
      });
      card.append(dates);
    }
    if (stay.notes?.length) {
      const notes = element("div", "stay-notes");
      stay.notes.forEach((note) => notes.append(element("p", "", note)));
      card.append(notes);
    }
    $("#stay-content").replaceChildren(card);
  }

  function renderBookings(bookings = []) {
    const list = element("ol", "bookings-grid");
    bookings.forEach((booking) => {
      const item = element("li", "booking-card");
      const date = element("div", "booking-date");
      const parts = dateParts(booking.date);
      date.append(element("strong", "", parts?.day || "—"), element("span", "", parts ? "NOV" : booking.dateLabel));
      const copy = element("div", "booking-main");
      if (booking.time) copy.append(element("div", "booking-time", booking.time));
      copy.append(element("h3", "", booking.title));
      if (booking.dateLabel) copy.append(element("p", "", booking.dateLabel));
      if (booking.location) copy.append(element("p", "", booking.location));
      if (booking.notes?.length) copy.append(element("p", "", booking.notes));
      copy.append(badge(booking.status || "confirmed", booking.statusLabel));
      if (booking.mapUrl) {
        const route = mapLink(booking.mapUrl);
        if (route) copy.append(route);
      }
      item.append(date, copy);
      list.append(item);
    });
    $("#bookings-content").replaceChildren(list);
  }

  function dayMotif(index) {
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", "0 0 90 50");
    svg.setAttribute("class", "day-motif");
    svg.setAttribute("aria-hidden", "true");
    const motifs = [
      "M5 40h79M13 31h31V14H27v9H13Zm38-17h27v17H51ZM30 14V9h8v5M44 28h7M24 37a4 4 0 1 0 0-.01M38 37a4 4 0 1 0 0-.01M57 37a4 4 0 1 0 0-.01M72 37a4 4 0 1 0 0-.01M33 6q-7-5-2-8",
      "M7 42h76M24 42V13M19 10q-9 3-2 9q7 4 11-3q-3-7-9-6M52 40q-13-10 0-20q13 10 0 20ZM53 41V13M45 9q-10-9-11 0q3 8 11 0Zm9 4q5-14 12-9q4 7-12 9M71 41V25m-3-4q-8 3-3 9q7 1 9-4q-1-6-6-5",
      "M7 39q13-5 25 0t25 0t26 0M9 46q11-4 23 0t25 0t24 0M12 31l17-20 13 16 14-21 24 25M39 27l17-21M52 18v16m7-19v17m-11-3v6"
    ];
    const path = document.createElementNS(svgNS, "path");
    path.setAttribute("d", motifs[index % motifs.length]);
    svg.append(path);
    return svg;
  }

  function renderItem(item = {}) {
    const li = element("li", `timeline-item ${statusStyles[item.status] || "suggested"}`);
    if (item.id) li.id = `item-${item.id}`;
    const card = element("article", "timeline-card");
    const meta = element("div", "item-meta");
    if (item.time) meta.append(element("span", "item-time", item.time));
    meta.append(badge(item.status, item.statusLabel));
    card.append(meta, element("h4", "", item.title));
    if (item.summary) card.append(element("p", "item-description", item.summary));
    if (item.details?.length) appendNotes(card, item.details);
    if (item.tip) card.append(element("p", "item-notes", item.tip));
    if (item.address || item.mapUrl || item.website) {
      const address = element("div", "item-address");
      if (item.address) address.append(element("address", "", item.address));
      const links = element("div", "item-links");
      const map = mapLink(item.mapUrl, item.address);
      const website = link(item.website, "官网资料", "");
      if (map) links.append(map);
      if (website) links.append(website);
      if (links.children.length) address.append(links);
      card.append(address);
    }
    li.append(card);
    return li;
  }

  function renderDays(days = []) {
    const sections = days.map((day, index) => {
      const section = element("section", "day-section");
      section.id = day.id || `day-${day.date}`;
      const headingId = `${section.id}-title`;
      section.setAttribute("aria-labelledby", headingId);
      const heading = element("div", "day-heading");
      const date = dateParts(day.date);
      heading.append(element("span", "day-num", date?.day || String(index + 1).padStart(2, "0")));
      heading.append(element("p", "day-date", [day.dateLabel || dateHeading(day.date), day.weekday].filter(Boolean).join(" · ")));
      const title = element("h3", "", day.title);
      title.id = headingId;
      heading.append(title);
      if (day.subtitle) heading.append(element("p", "", day.subtitle));
      heading.append(dayMotif(index));
      const body = element("div", "day-body");
      const list = element("ol", "day-items");
      (day.items || []).forEach((item) => list.append(renderItem(item)));
      body.append(list);
      if (day.route?.length) {
        const route = element("p", "day-note");
        route.append(element("strong", "", "这一天的路线 · "), document.createTextNode(day.route.join(" → ")));
        body.append(route);
      }
      section.append(heading, body);
      return section;
    });
    $("#days-content").replaceChildren(...sections);
    const nav = $(".nav-inner");
    nav.replaceChildren(...days.map((day, index) => {
      const id = day.id || `day-${day.date}`;
      const date = dateParts(day.date);
      const anchor = element("a", "day-link");
      anchor.href = `#${id}`;
      anchor.dataset.dayLink = id;
      anchor.append(element("span", "", `${date?.day || index + 1} NOV`), element("strong", "", day.navLabel || [day.weekday, day.title].filter(Boolean).join(" · ")));
      anchor.title = [day.dateLabel, day.title].filter(Boolean).join(" · ");
      return anchor;
    }));
    installDayNavigation(sections);
  }

  function markActiveDay(id) {
    document.querySelectorAll("[data-day-link]").forEach((anchor) => {
      if (anchor.dataset.dayLink === id) anchor.setAttribute("aria-current", "date");
      else anchor.removeAttribute("aria-current");
    });
  }
  function installDayNavigation(sections) {
    if (!sections.length) return;
    markActiveDay(window.location.hash.slice(1) || sections[0].id);
    document.querySelectorAll("[data-day-link]").forEach((anchor) => anchor.addEventListener("click", () => markActiveDay(anchor.dataset.dayLink)));
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length) markActiveDay(visible[0].target.id);
      }, { rootMargin: "-80px 0px -55% 0px", threshold: 0 });
      sections.forEach((section) => observer.observe(section));
    }
    const hashTarget = window.location.hash.slice(1);
    if (hashTarget) requestAnimationFrame(() => document.getElementById(hashTarget)?.scrollIntoView());
  }

  function readChecklistState() {
    try {
      const stored = JSON.parse(localStorage.getItem(storageKey) || "{}");
      checklistState = stored && typeof stored === "object" && !Array.isArray(stored) ? stored : {};
    } catch {
      checklistState = {};
      storageAvailable = false;
    }
  }
  function saveChecklistState() {
    try { localStorage.setItem(storageKey, JSON.stringify(checklistState)); }
    catch { storageAvailable = false; }
    updateChecklistProgress();
  }
  function updateChecklistProgress() {
    const complete = checklistItems.filter((item) => checklistState[item.id] === true).length;
    $("#checklist-progress").textContent = `${complete} / ${checklistItems.length} 已准备`;
    $("#checklist-description").textContent = storageAvailable ? "勾选保存在本设备浏览器中。" : "此浏览器无法保存；勾选只保留在当前页面。";
  }
  function renderChecklist(items = []) {
    checklistItems = items;
    readChecklistState();
    const grid = element("div", "checklist-grid");
    items.forEach((item) => {
      const label = element("label", "check-row");
      const input = element("input", "");
      input.type = "checkbox";
      input.id = `check-${item.id}`;
      input.checked = checklistState[item.id] === true;
      const copy = element("span", "", item.label);
      if (item.detail) copy.append(element("small", "", item.detail));
      label.classList.toggle("checked", input.checked);
      label.append(input, copy);
      input.addEventListener("change", () => {
        checklistState[item.id] = input.checked;
        label.classList.toggle("checked", input.checked);
        saveChecklistState();
      });
      grid.append(label);
    });
    $("#checklist-content").replaceChildren(grid);
    updateChecklistProgress();
  }

  function renderSources(sources = [], notes = []) {
    const container = $("#sources-content");
    container.replaceChildren();
    if (notes.length) container.append(element("p", "source-note", notes));
    const list = element("ul", "sources-list");
    sources.forEach((source) => {
      const item = element("li", "");
      const sourceLink = link(source.url, `${source.title} ↗`, "");
      item.append(sourceLink || element("span", "", source.title));
      if (source.note) item.append(element("p", "", source.note));
      list.append(item);
    });
    container.append(list);
  }

  $("[data-print]")?.addEventListener("click", () => window.print());
  $("#reset-checklist")?.addEventListener("click", () => {
    checklistState = {};
    document.querySelectorAll("#checklist-content input").forEach((input) => {
      input.checked = false;
      input.closest("label").classList.remove("checked");
    });
    saveChecklistState();
  });

  let sourceWasOpen = false;
  window.addEventListener("beforeprint", () => {
    sourceWasOpen = $("#sources-details").open;
    $("#sources-details").open = true;
  });
  window.addEventListener("afterprint", () => { $("#sources-details").open = sourceWasOpen; });

  async function loadTrip() {
    try {
      const response = await fetch("trip-data.json", { cache: "no-cache" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      renderHero(data.trip);
      renderStay(data.stay);
      renderBookings(data.bookings || []);
      renderDays(data.days || []);
      renderChecklist(data.checklist || []);
      renderSources(data.sources || [], data.notes || []);
      $("#load-notice").textContent = "";
      document.documentElement.dataset.tripLoaded = "true";
    } catch (error) {
      const notice = $("#load-notice");
      notice.classList.add("notice");
      notice.replaceChildren(element("strong", "", "完整行程暂时没有载入。"), element("p", "", "请刷新页面，或直接查看行程资料。"));
      const source = document.createElement("a");
      source.href = "trip-data.json";
      source.textContent = "查看行程资料文件 →";
      notice.append(source);
      $("#reset-checklist").hidden = true;
      $("#checklist-description").textContent = "行程载入后可使用行前清单。";
      document.documentElement.dataset.tripLoaded = "false";
      console.error("Daylesford itinerary could not be loaded:", error);
    }
  }
  loadTrip();
})();
