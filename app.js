// Preserve old shared photo links after moving the research to its own page.
const photoAnchors = new Set(['photos', 'photo-xian', 'photo-guilin', 'photo-yangshuo', 'xian-photographers', 'photographers']);
function redirectPhotoAnchor() {
  const currentHash = decodeURIComponent(location.hash.slice(1));
  if (photoAnchors.has(currentHash) && !location.pathname.endsWith('/photos.html')) {
    location.replace('photos.html' + location.hash);
    return true;
  }
  return false;
}
function openAnchor() {
  const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
  if (!target) return;
  let parent = target;
  while (parent) {
    if (parent.tagName === 'DETAILS') parent.open = true;
    parent = parent.parentElement;
  }
  requestAnimationFrame(() => target.scrollIntoView({ block: 'start' }));
}
window.addEventListener('hashchange', () => {
  if (!redirectPhotoAnchor()) openAnchor();
});
if (!redirectPhotoAnchor() && location.hash) openAnchor();

// Content stays visible without a scroll-triggered opacity animation.
let printState = null;
function preparePrint() {
  if (printState !== null) return;
  printState = [...document.querySelectorAll('details')].map(node => [node, node.open]);
  printState.forEach(([node]) => { node.open = true; });
}
function restorePrint() {
  if (printState === null) return;
  printState.forEach(([node, wasOpen]) => { node.open = wasOpen; });
  printState = null;
}
window.addEventListener('beforeprint', preparePrint);
window.addEventListener('afterprint', restorePrint);
document.querySelectorAll('[data-print]').forEach(button => {
  button.addEventListener('click', () => { preparePrint(); window.print(); });
});
