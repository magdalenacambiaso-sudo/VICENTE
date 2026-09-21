(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const clamp01 = (v) => Math.max(0, Math.min(1, v));
  const remap = (v, a, b) => clamp01((v - a) / (b - a));
  const lerp = (a, b, t) => a + (b - a) * t;

  /* ---------------------------------------------------------------------
     Momento 02 — generar la pieza gráfica de "complejidad"
     Columnas de tramos de color, altura ascendente con variación,
     evocando muchas variables pequeñas combinándose sin ser un gráfico
     de datos literal.
     --------------------------------------------------------------------- */
  const PALETTE = [
    "#151719", "#151719", "#151719", "#2A2D30",
    "#C43B2B", "#D6A429", "#3B6B4A", "#1557D6", "#F2F0E8",
  ];

  function buildComplexityGraphic() {
    const el = document.getElementById("complexity-graphic");
    if (!el) return;
    el.innerHTML = "";

    const cols = window.innerWidth < 860 ? 18 : 30;
    const frag = document.createDocumentFragment();

    for (let i = 0; i < cols; i++) {
      const col = document.createElement("div");
      col.className = "cg-col";

      const envelope = 0.18 + (i / (cols - 1)) * 0.7;
      const noise = Math.random() * 0.22;
      const colHeightPct = clamp01(envelope + noise) * 100;
      // Explicit height (not "stretch") so the percentage heights on the
      // stripes inside have a resolvable reference box.
      col.style.height = colHeightPct + "%";

      const stripeCount = 4 + Math.floor(Math.random() * 6);
      const stripeH = 100 / stripeCount;

      for (let s = 0; s < stripeCount; s++) {
        const stripe = document.createElement("span");
        stripe.className = "cg-stripe";
        stripe.style.height = stripeH + "%";
        const useAccent = Math.random() < 0.22;
        stripe.style.background = useAccent
          ? PALETTE[4 + Math.floor(Math.random() * (PALETTE.length - 4))]
          : PALETTE[Math.floor(Math.random() * 4)];
        col.appendChild(stripe);
      }
      frag.appendChild(col);
    }
    el.appendChild(frag);
  }

  /* ---------------------------------------------------------------------
     Secuencia de scroll: hero -> complejidad -> método
     --------------------------------------------------------------------- */
  const opening = document.getElementById("opening");
  const mHero = document.getElementById("m-hero");
  const heroVeil = document.getElementById("hero-veil");
  const heroChrome = document.getElementById("hero-chrome");
  const heroPhoto = document.getElementById("hero-photo");
  const mComplexity = document.getElementById("m-complexity");
  const mMethod = document.getElementById("m-method");
  const methodLine = document.getElementById("method-line");
  const methodSteps = Array.from(document.querySelectorAll(".method-step"));
  const methodFigures = Array.from(document.querySelectorAll(".method-figure"));

  const PH = {
    chromeOut: [0.06, 0.20],
    photoToBone: [0.12, 0.30],
    heroOut: [0.26, 0.38],
    complexityIn: [0.24, 0.36],
    complexityOut: [0.52, 0.63],
    methodIn: [0.61, 0.76],
    methodLine: [0.68, 0.86],
    methodSteps: [0.74, 0.98],
  };

  let ticking = false;

  function render() {
    ticking = false;
    const rect = opening.getBoundingClientRect();
    const scrollable = rect.height - window.innerHeight;
    const p = scrollable > 0 ? clamp01(-rect.top / scrollable) : 0;

    // Hero chrome fade + lift
    const chromeT = remap(p, ...PH.chromeOut);
    heroChrome.style.opacity = String(1 - chromeT);
    heroChrome.style.transform = `translateY(${lerp(0, -14, chromeT)}px)`;
    heroChrome.style.pointerEvents = chromeT > 0.9 ? "none" : "auto";

    // Hero photo -> bone veil crossfade, slow zoom
    const veilT = remap(p, ...PH.photoToBone);
    heroVeil.style.opacity = String(veilT);
    heroPhoto.style.transform = `scale(${lerp(1, 1.035, clamp01(p / 0.85))})`;

    // Whole hero moment dissolves away once it has become the bone veil,
    // so the moments underneath (same z-index stack) become visible.
    const heroOutT = remap(p, ...PH.heroOut);
    mHero.style.opacity = String(1 - heroOutT);
    mHero.style.pointerEvents = heroOutT > 0.95 ? "none" : "auto";

    // Momento 02 — complejidad
    const cIn = remap(p, ...PH.complexityIn);
    const cOut = remap(p, ...PH.complexityOut);
    const complexityOpacity = Math.min(cIn, 1 - cOut);
    mComplexity.style.opacity = String(complexityOpacity);
    mComplexity.style.transform = `translateY(${lerp(20, 0, cIn)}px) translateY(${lerp(0, -16, cOut)}px) scale(${lerp(1, 0.97, cOut)})`;
    mComplexity.style.pointerEvents = complexityOpacity > 0.05 ? "auto" : "none";

    // Momento 03 — método
    const mIn = remap(p, ...PH.methodIn);
    mMethod.style.opacity = String(mIn);
    mMethod.style.transform = `translateY(${lerp(20, 0, mIn)}px)`;
    mMethod.style.pointerEvents = mIn > 0.05 ? "auto" : "none";

    const lineT = remap(p, ...PH.methodLine);
    methodLine.style.width = lineT * 80 + "%";

    const stepsT = remap(p, ...PH.methodSteps);
    methodSteps.forEach((step, i) => {
      const local = clamp01((stepsT - i * 0.16) / 0.5);
      step.style.opacity = String(local);
      step.style.transform = `translate(-50%, calc(-50% + ${lerp(10, 0, local)}px))`;
    });
    methodFigures.forEach((fig, i) => {
      const local = clamp01((stepsT - 0.3 - i * 0.2) / 0.4);
      fig.style.opacity = String(local * 0.55);
    });
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(render);
    }
  }

  function init() {
    buildComplexityGraphic();
    render();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", () => {
      buildComplexityGraphic();
      render();
    });

    if (reduceMotion) {
      document.querySelectorAll(".moment").forEach((m) => {
        m.style.transition = "none";
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
