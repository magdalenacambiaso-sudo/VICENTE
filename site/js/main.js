(() => {
  "use strict";

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------------------------
     Header: solid on scroll
  --------------------------------------------------------------------- */
  const header = document.getElementById("site-header");
  const onScrollHeader = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };
  onScrollHeader();
  window.addEventListener("scroll", onScrollHeader, { passive: true });

  /* ---------------------------------------------------------------------
     Mobile menu
  --------------------------------------------------------------------- */
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  const closeMenu = () => {
    menuToggle.setAttribute("aria-expanded", "false");
    mobileMenu.classList.remove("is-open");
    document.body.style.overflow = "";
  };
  const openMenu = () => {
    menuToggle.setAttribute("aria-expanded", "true");
    mobileMenu.classList.add("is-open");
    document.body.style.overflow = "hidden";
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    isOpen ? closeMenu() : openMenu();
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  /* ---------------------------------------------------------------------
     Scroll reveal (fades/slides + square mask reveals on photo frames)
  --------------------------------------------------------------------- */
  const revealEls = document.querySelectorAll("[data-reveal]");
  const maskEls = document.querySelectorAll("[data-reveal-mask]");

  if (reducedMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("in-view"));
    maskEls.forEach((el) => el.classList.add("in-view"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach((el, i) => {
      el.style.transitionDelay = `${Math.min(i % 5, 4) * 60}ms`;
      revealObserver.observe(el);
    });

    // Masked elements are clipped down to a tiny sliver before reveal, so
    // observing them directly starves the intersection ratio below any
    // threshold. Observe their (unclipped) parent instead.
    const maskObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const child = entry.target.querySelector("[data-reveal-mask]");
            if (child) child.classList.add("in-view");
            maskObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    maskEls.forEach((el) => maskObserver.observe(el.parentElement || el));
  }

  /* ---------------------------------------------------------------------
     Servicios: acordeón + demo visual asociada
  --------------------------------------------------------------------- */
  const serviceRows = document.querySelectorAll(".service-row");

  serviceRows.forEach((row) => {
    const head = row.querySelector(".service-head");
    head.addEventListener("click", () => {
      const open = row.dataset.open === "true";
      row.dataset.open = String(!open);
      head.setAttribute("aria-expanded", String(!open));
    });
  });

  /* ---------------------------------------------------------------------
     Spine: hero -> filosofía, línea + punto según progreso de scroll
  --------------------------------------------------------------------- */
  const spine = document.getElementById("spine-1");
  const spineFill = spine ? spine.querySelector(".spine-fill") : null;
  const spineDot = spine ? spine.querySelector(".spine-dot") : null;

  /* ---------------------------------------------------------------------
     Cómo trabajamos: línea de progreso + pasos activos
  --------------------------------------------------------------------- */
  const processList = document.getElementById("process-list");
  const processFill = document.getElementById("process-line-fill");
  const processSteps = document.querySelectorAll(".process-step");

  /* ---------------------------------------------------------------------
     Parallax sutil — planos de fondo/medio a velocidades distintas
  --------------------------------------------------------------------- */
  const parallaxEls = Array.from(document.querySelectorAll("[data-parallax]")).map((el) => ({
    el,
    factor: parseFloat(el.dataset.parallax) || 0,
  }));

  /* ---------------------------------------------------------------------
     Brand moment: el Bravo Square crece hasta llenar la pantalla
  --------------------------------------------------------------------- */
  const brandMoment = document.getElementById("brand-moment");
  const bmSquare = document.getElementById("bm-square");
  const bmLine1 = brandMoment ? brandMoment.querySelector(".bm-line-1") : null;
  const bmLine2 = brandMoment ? brandMoment.querySelector(".bm-line-2") : null;

  let ticking = false;

  const updateScrollLinked = () => {
    const viewportH = window.innerHeight;

    if (spine && spineFill && spineDot) {
      const rect = spine.getBoundingClientRect();
      const start = viewportH * 0.85;
      const total = rect.height + viewportH * 0.15;
      const progressed = start - rect.top;
      const pct = Math.min(1, Math.max(0, progressed / total));
      spineFill.style.height = `${pct * 100}%`;
      spineDot.style.top = `${pct * 100}%`;
    }

    if (processList && processFill) {
      const rect = processList.getBoundingClientRect();
      const start = viewportH * 0.85;
      const total = rect.height + viewportH * 0.3;
      const progressed = start - rect.top;
      const pct = Math.min(1, Math.max(0, progressed / total));
      processFill.style.height = `${pct * 100}%`;

      const scanY = viewportH * 0.7;
      processSteps.forEach((step) => {
        const r = step.getBoundingClientRect();
        step.classList.toggle("is-active", r.top < scanY);
      });
    }

    if (parallaxEls.length) {
      parallaxEls.forEach(({ el, factor }) => {
        const rect = el.getBoundingClientRect();
        const centerDelta = rect.top + rect.height / 2 - viewportH / 2;
        el.style.transform = `translateY(${(-centerDelta * factor).toFixed(2)}px)`;
      });
    }

    if (brandMoment && bmSquare) {
      const rect = brandMoment.getBoundingClientRect();
      const total = rect.height - viewportH;
      const progressed = -rect.top;
      const pct = Math.min(1, Math.max(0, total > 0 ? progressed / total : 0));

      if (bmLine1) bmLine1.classList.toggle("is-visible", pct >= 0.03 && pct < 0.3);
      if (bmLine2) bmLine2.classList.toggle("is-visible", pct >= 0.32 && pct < 0.92);

      const maxSize = Math.hypot(viewportH, window.innerWidth) * 1.15;
      const growStart = 0.34;
      const growEnd = 0.86;
      let size = 14;
      if (pct > growStart) {
        const growPct = Math.min(1, (pct - growStart) / (growEnd - growStart));
        const eased = growPct * growPct * (3 - 2 * growPct);
        size = 14 + eased * (maxSize - 14);
      }
      bmSquare.style.width = `${size}px`;
      bmSquare.style.height = `${size}px`;
    }

    ticking = false;
  };

  const requestUpdate = () => {
    if (!ticking) {
      requestAnimationFrame(updateScrollLinked);
      ticking = true;
    }
  };

  updateScrollLinked();
  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);

  /* ---------------------------------------------------------------------
     Formulario de contacto (front-end only)
  --------------------------------------------------------------------- */
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      form.classList.add("is-sent");
    });
  }

  /* ---------------------------------------------------------------------
     Agendar reunión — placeholder
  --------------------------------------------------------------------- */
  const meetingLink = document.getElementById("meeting-link");
  if (meetingLink) {
    meetingLink.addEventListener("click", () => {
      meetingLink.querySelector("em").textContent = "— la agenda se habilita pronto";
    });
  }

  /* ---------------------------------------------------------------------
     Footer year
  --------------------------------------------------------------------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------------------------------------------------------------
     Anchor scroll offset (account for fixed header)
  --------------------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href");
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const offset = 76;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: reducedMotion ? "auto" : "smooth" });
    });
  });
})();
