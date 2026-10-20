'use strict';

// Public pages contain no private identifiers. Old bookmarks continue to work.
const legacySections = {
  route:'index.html#route', overview:'index.html#route',
  hotels:'bookings.html#hotels', 'selected-stay':'bookings.html#selected-stay',
  'guangzhou-hotels':'bookings.html#guangzhou-hotels',
  'hongkong-hotels':'bookings.html#hongkong-hotels',
  'hongkong-marathon':'bookings.html#hongkong-marathon',
  'confirmed-flights':'bookings.html#confirmed-flights',
  'confirmed-dates':'bookings.html#confirmed-dates',
  'confirmed-flight-rows':'bookings.html#confirmed-flights',
  'seoul-confirmed-booking-rows':'bookings.html#selected-stay',
  'changsha-hotels':'planning.html#changsha-hotels',
  'changsha-running-weather':'planning.html#changsha-running-weather',
  'shanghai-hotels':'planning.html#shanghai-hotels',
  'pudong-reunion':'planning.html#pudong-reunion',
  tasks:'planning.html#tasks', checklist:'planning.html#tasks',
  changsha:'planning.html#changsha', seoul:'planning.html#seoul',
  'seoul-photos':'planning.html#seoul-photos', 'hongkong-dining':'planning.html#hongkong-dining',
  visa:'planning.html#visa', alternatives:'research.html#alternatives', sources:'research.html#sources',
  'seoul-research-history':'research.html#seoul-research-history',
  'selected-stay-quote-history':'research.html#selected-stay-quote-history',
  'lescape-photos':'research.html#lescape-photos', 'room-photo-cards':'research.html#room-photo-cards',
  'reverse-stayplus':'research.html#reverse-stayplus', 'hotel-cards':'research.html#hotel-cards',
  'accor-offer':'research.html#accor-offer', 'split-stay':'research.html#split-stay',
  'budget-3500':'research.html#budget-3500', 'seoul-more-hotels':'research.html#seoul-more-hotels',
  'seoul-reviews':'research.html#seoul-reviews', 'amex-fhr':'research.html#amex-fhr',
  'seoul-running':'research.html#seoul-running'
};
function revealAnchor() {
  let id;
  try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
  if (!id) return;
  const target = document.getElementById(id);
  if (!target) {
    if (legacySections[id]) {
      const url = new URL(legacySections[id], location.href);
      if (url.pathname !== location.pathname || url.hash !== location.hash) location.replace(url.href);
    }
    return;
  }
  let node = target;
  let expanded = false;
  while (node && node !== document.body) {
    if (node.tagName === 'DETAILS' && !node.open) { node.open = true; expanded = true; }
    node = node.parentElement;
  }
  if (expanded) requestAnimationFrame(() => target.scrollIntoView({block:'start'}));
}
window.addEventListener('hashchange', revealAnchor);
revealAnchor();

// Preserve previous local checklist IDs; a checkbox never implies a booking.
const storageKey = 'winter-2026-tasks';
let checked = {};
try {
  const saved = JSON.parse(localStorage.getItem(storageKey) || '{}');
  if (saved && typeof saved === 'object' && !Array.isArray(saved)) checked = saved;
} catch { /* Usable when storage is unavailable. */ }
const taskInputs = [...document.querySelectorAll('[data-task]')];
const hideCompleted = document.getElementById('hide-completed');
function updateTasks() {
  let count = 0;
  taskInputs.forEach(input => {
    const done = input.checked;
    if (done) count++;
    const row = input.closest('.task-row');
    row.classList.toggle('is-complete', done);
    row.hidden = Boolean(hideCompleted?.checked && done);
  });
  const progress = document.getElementById('progress');
  if (progress) progress.textContent = `本机已完成 ${count} / ${taskInputs.length} 项`;
  const empty = document.getElementById('tasks-empty');
  if (empty) empty.hidden = !(hideCompleted?.checked && count === taskInputs.length);
}
taskInputs.forEach(input => {
  input.checked = checked[input.dataset.task] === true;
  input.addEventListener('change', () => {
    checked[input.dataset.task] = input.checked;
    try { localStorage.setItem(storageKey, JSON.stringify(checked)); } catch { /* Local only. */ }
    updateTasks();
  });
});
hideCompleted?.addEventListener('change', updateTasks);
updateTasks();
let printClosed = [];
window.addEventListener('beforeprint', () => {
  printClosed = [...document.querySelectorAll('details:not([open])')];
  printClosed.forEach(item => { item.open = true; });
});
window.addEventListener('afterprint', () => {
  printClosed.forEach(item => { item.open = false; });
  printClosed = [];
});
document.getElementById('print')?.addEventListener('click', () => window.print());
