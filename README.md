# Guild 86 — Proyecto de Branding

Repositorio de trabajo para armar la identidad de marca de **Vicente** — su estudio de
ingeniería de IA y automatización — y, más adelante, su sitio web con portfolio.

## Estado: Fase 1 — Identidad de marca ✅ cerrada

- [x] Nombre: **Guild 86** (ver [`brand/naming.md`](brand/naming.md))
- [x] Tipografía: Helvetica
- [x] Paleta: blanco/negro + **azul cobalto** `#1D4ED8` (ver [`brand/color-options.html`](brand/color-options.html) para el historial de opciones)
- [x] Manual de marca final ([`brand/brand-guidelines.md`](brand/brand-guidelines.md) / [`brand/style-guide.html`](brand/style-guide.html))
- [~] Logo — **fuera de alcance**, lo hace una diseñadora externa (quedan bocetos exploratorios
      como referencia, no vinculantes)
- [ ] Registro de dominio y handles de redes

## Estructura del repo

```
brand/
  naming.md               — racional del nombre + chequeo de dominios
  brand-guidelines.md      — manual de marca (paleta, tipografía, alcance del logo)
  style-guide.html          — versión visual navegable del manual de marca
  color-options.html        — comparación de las 4 opciones de acento de color
  logo/                     — bocetos exploratorios de logo (referencia para la diseñadora, no definitivos)
    seal-mark.svg, monogram.svg, wordmark.svg, lockup-horizontal.svg
    concepts/               — 3 conceptos alternativos descartados como decisión final
```

## Próximas fases

- **Fase 2:** sitio web propio con portfolio (Visión Norte, automatización de denuncias,
  portal de campaña, etc.)
- **Fase 3:** plantillas de redes sociales, tarjeta personal, firma de email

Ver el roadmap completo en [`brand/brand-guidelines.md`](brand/brand-guidelines.md#7-próximos-pasos).

---

## BRAVO — sitio web (proyecto aparte)

`site/` contiene el sitio web completo de **BRAVO**, una empresa B2B de
transformación digital ("Transformación digital a medida, con firma propia.").
Es un proyecto de marca distinto al de Guild86/Vicente documentado arriba.

Es un sitio estático (HTML/CSS/JS, sin dependencias ni build step). Para
verlo localmente:

```
cd site
python3 -m http.server 8000
# abrir http://localhost:8000
```

Estructura:

```
site/
  index.html       — todas las secciones (hero, servicios, casos, proceso, contacto, etc.)
  css/style.css     — sistema de diseño (tokens, tipografía, componentes)
  js/main.js        — reveals al hacer scroll, acordeón de servicios, menú móvil, formulario
```

Los casos en la sección "Casos" son placeholders explícitos, listos para
reemplazarse por proyectos reales.
