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
     Scroll reveal
  --------------------------------------------------------------------- */
  const revealEls = document.querySelectorAll("[data-reveal]");

  if (reducedMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("in-view"));
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
      el.style.transitionDelay = `${Math.min(i % 4, 3) * 70}ms`;
      revealObserver.observe(el);
    });
  }

  /* ---------------------------------------------------------------------
     Servicios: accordion + "explorar todo"
  --------------------------------------------------------------------- */
  const serviceRows = document.querySelectorAll(".service-row");
  const toggleAllBtn = document.getElementById("services-toggle-all");

  const setRowOpen = (row, open) => {
    row.dataset.open = String(open);
    row.querySelector(".service-row-head").setAttribute("aria-expanded", String(open));
  };

  serviceRows.forEach((row) => {
    const head = row.querySelector(".service-row-head");
    head.addEventListener("click", () => {
      setRowOpen(row, row.dataset.open !== "true");
    });
  });

  if (toggleAllBtn) {
    toggleAllBtn.addEventListener("click", () => {
      const anyClosed = Array.from(serviceRows).some((r) => r.dataset.open !== "true");
      serviceRows.forEach((row) => setRowOpen(row, anyClosed));
      toggleAllBtn.textContent = anyClosed ? "Ocultar detalle" : "Explorar nuestros servicios";
    });
  }

  /* ---------------------------------------------------------------------
     Cómo trabajamos: línea de progreso + pasos activos
  --------------------------------------------------------------------- */
  const processList = document.getElementById("process-list");
  const processFill = document.getElementById("process-line-fill");
  const processSteps = document.querySelectorAll(".process-step");

  if (processList && processFill) {
    let ticking = false;

    const updateProcess = () => {
      const rect = processList.getBoundingClientRect();
      const viewportH = window.innerHeight;
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

      ticking = false;
    };

    const requestUpdate = () => {
      if (!ticking) {
        requestAnimationFrame(updateProcess);
        ticking = true;
      }
    };

    updateProcess();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
  }

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
      meetingLink.querySelector("span").textContent = "— la agenda se habilita pronto";
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
      const offset = 88;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: reducedMotion ? "auto" : "smooth" });
    });
  });
})();
