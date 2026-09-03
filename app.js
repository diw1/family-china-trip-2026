const printButton = document.querySelector("[data-print]");

if (printButton) {
  printButton.addEventListener("click", () => window.print());
}

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reduceMotion && "IntersectionObserver" in window) {
  const revealTargets = document.querySelectorAll(
    ".fact-card, .route-stop, .day-card, .info-card, .destination-card, .check-card, .stay-banner, .map-day, .resort-card, .activity-lane, .decision-grid article, .weather-band, .shanghai-stay, .shanghai-day-card, .split-track, .venue-card, .crab-card, .season-warning"
  );

  document.documentElement.classList.add("reveal-ready");
  revealTargets.forEach((target) => target.setAttribute("data-reveal", ""));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealTargets.forEach((target) => observer.observe(target));
}
