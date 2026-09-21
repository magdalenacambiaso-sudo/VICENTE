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

La identidad visual nace del logo oficial (`site/assets/bravo-lockup.png` /
`bravo-wordmark.png`): Helvetica, blanco, negro y **Bravo Blue**, con **el
Bravo Square** —el cuadrado azul del logo— como firma gráfica que aparece
con moderación (a veces solo el punto de "Bravo■", a veces aislado, casi
nunca explicando un concepto). Sin serif, sin fuentes externas — solo el
stack del sistema (`Helvetica Neue`, Helvetica, Arial).

El hero es una fotografía humana a pantalla completa (personas detrás de
una superficie translúcida) con la identidad viviendo limpia por encima.
La fotografía se muestra siempre "en plano" (componente `.plain-photo` en
`css/style.css`, con un desplazamiento de escala muy lento) — sin máscaras,
sin seguimiento de cursor, sin metáforas animadas por sección. Las fotos que
usa hoy son referencias temporales de moodboard, no assets finales — ver
`site/assets/photo-placeholders/README.md`.

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
  index.html                    — todas las secciones (hero, servicios, proceso, contacto, etc.)
  css/style.css                  — sistema de diseño (tokens, tipografía, componentes)
  js/main.js                     — reveals al hacer scroll, acordeón de servicios, menú móvil,
                                    parallax sutil, formulario
  assets/bravo-lockup.png        — logo oficial completo (wordmark + slogan), fondo transparente
  assets/bravo-wordmark.png      — solo "Bravo." con el punto, fondo transparente (footer)
  assets/bravo-wordmark-white.png — versión blanca del wordmark (nav sobre el hero fotográfico)
  assets/photo-placeholders/     — fotografía temporal de moodboard (ver su propio README)
```

La sección "Casos" queda preparada en el markup (`<section id="casos" hidden>`)
pero oculta hasta que existan proyectos reales para mostrar — no se publican
placeholders ni clientes inventados. Ver el comentario en `index.html` para
reactivarla.
