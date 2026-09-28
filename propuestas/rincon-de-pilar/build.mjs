// Builds index.html: the proposal deck for Rincón de Pilar.
// Usage: node build.mjs [artifact-url]
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const css = readFileSync(join(here, "page.css"), "utf8");
const js = readFileSync(join(here, "page.js"), "utf8").replace("__LINK_BASE__", process.argv[2] || "__LINK_BASE__");

const TOTAL = 16;
const pad = (n) => String(n).padStart(2, "0");
const LEGEND = `<span class="legend">Visualización conceptual / datos ficticios</span>`;
const lbl = (n, t) => `<span class="lbl">${pad(n)} — ${t}</span>`;

// deterministic pseudo-random for illustration details
let seed = 7;
const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);

/* ------------------------------------------------------------ illustrations */

// Cover: the venue at dusk, day/night split in the sky. No people.
function coverIll() {
  let s = `<svg class="ill" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">`;
  s += `<defs><clipPath id="night"><path d="M820 120 A180 180 0 0 0 820 480 Z"/></clipPath></defs>`;
  // stars
  for (let i = 0; i < 70; i++) {
    const x = 380 + rnd() * 820, y = 40 + rnd() * 330, r = rnd() * 0.9 + 0.3;
    s += `<circle class="dot" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(2)}" opacity="${(0.25 + rnd() * 0.5).toFixed(2)}"/>`;
  }
  // day / night disc
  s += `<circle class="s" cx="820" cy="300" r="180" opacity=".8"/>`;
  s += `<g clip-path="url(#night)">`;
  for (let y = 126; y < 480; y += 7) s += `<line class="s2" x1="630" y1="${y}" x2="820" y2="${y}"/>`;
  s += `</g><line class="s" x1="820" y1="120" x2="820" y2="480" opacity=".7"/>`;
  s += `<circle class="s2" cx="820" cy="300" r="230"/>`;
  // horizon
  s += `<line class="s" x1="0" y1="600" x2="1200" y2="600"/>`;
  // pavilion
  s += `<rect x="360" y="478" width="740" height="122" fill="#151719"/>`;
  s += `<path class="s" d="M330 470 H1130 M340 476 H1120 M360 476 V600 M1100 476 V600"/>`;
  let k = 0;
  for (let x = 382; x < 1090; x += 28) {
    const lit = [3, 4, 5, 9, 10, 14, 15, 16, 17, 21].includes(k);
    if (lit) s += `<rect class="w" x="${x + 1}" y="490" width="26" height="110" opacity=".16"/>`;
    s += `<line class="s" x1="${x}" y1="486" x2="${x}" y2="600" opacity=".75"/>`;
    k++;
  }
  s += `<path class="s2" d="M360 520 H1100"/>`;
  // door
  s += `<rect class="w" x="700" y="500" width="56" height="100" opacity=".32"/><path class="s" d="M700 600 V500 H756 V600"/>`;
  // poplars
  [[250, 430, 24, 150], [296, 455, 19, 125], [1160, 440, 22, 140], [1196, 462, 17, 118], [210, 470, 15, 100]].forEach(([cx, cy, rx, ry]) => {
    s += `<ellipse class="s" cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}"/><line class="s" x1="${cx}" y1="${cy + ry}" x2="${cx}" y2="600"/>`;
    for (let j = -ry + 20; j < ry - 10; j += 22) s += `<line class="s2" x1="${cx - rx * 0.5}" y1="${cy + j}" x2="${cx + rx * 0.4}" y2="${cy + j - 8}"/>`;
  });
  // ground: avenue towards the door + soft lines
  [-400, 0, 380, 1060, 1440, 1840].forEach((x) => (s += `<line class="s2" x1="${x}" y1="800" x2="${728 + (x - 728) * 0.06}" y2="600"/>`));
  [630, 672, 730].forEach((y) => (s += `<line class="s2" x1="0" y1="${y}" x2="1200" y2="${y}"/>`));
  // reflection of the lit door
  s += `<path class="s2" d="M708 612 H748 M714 626 H742 M720 642 H736"/>`;
  s += `</svg>`;
  return s;
}

// Intro: from a click to an open door.
function introIll() {
  let s = `<svg class="ill" viewBox="0 0 560 680" aria-hidden="true">`;
  s += `<path class="w" d="M210 600 V310 A90 90 0 0 1 390 310 V600 Z"/>`;
  for (let y = 520; y < 600; y += 16) s += `<line class="s2" x1="210" y1="${y}" x2="390" y2="${y}"/>`;
  s += `<path class="s" d="M190 600 V310 A110 110 0 0 1 410 310 V600"/>`;
  s += `<path class="s" d="M210 600 V310 A90 90 0 0 1 390 310 V600"/>`;
  // door leaf ajar
  s += `<path class="b" d="M390 600 L452 628 L452 300 Q430 262 390 250 Z" opacity=".9"/>`;
  s += `<path class="s" d="M390 600 L452 628 L452 300 Q430 262 390 250"/>`;
  s += `<line class="s" x1="440" y1="450" x2="440" y2="470"/>`;
  // pendant lamp inside
  s += `<line class="s" x1="300" y1="220" x2="300" y2="372"/><path class="s" d="M282 392 L318 392 L310 372 L290 372 Z"/>`;
  s += `<path class="w" d="M284 394 L316 394 L352 520 L248 520 Z" opacity=".55"/>`;
  // ground
  s += `<line class="s" x1="20" y1="600" x2="540" y2="600"/>`;
  // path from the click
  s += `<path class="d" d="M58 652 C120 640 110 612 180 616 S270 640 300 604"/>`;
  s += `<circle class="dot" cx="58" cy="652" r="3.2"/><circle class="s" cx="58" cy="652" r="11"/><circle class="s2" cx="58" cy="652" r="20"/>`;
  s += `</svg>`;
  return s;
}

// Additions over time: planks added step by step, the first one is the site.
function stackIll() {
  let s = `<svg class="ill" viewBox="0 0 520 360" aria-hidden="true">`;
  s += `<line class="s" x1="10" y1="320" x2="510" y2="320"/>`;
  s += `<rect class="w" x="30" y="282" width="210" height="38"/><rect class="s" x="30" y="282" width="210" height="38"/>`;
  const steps = [[110, 236], [180, 196], [250, 156], [320, 116], [390, 76], [440, 36]];
  steps.forEach(([x, y], i) => {
    s += `<rect class="${i % 2 ? "g" : "b"}" x="${x}" y="${y}" width="${150 - i * 8}" height="30" opacity=".85"/>`;
    s += `<rect class="d" x="${x}" y="${y}" width="${150 - i * 8}" height="30"/>`;
  });
  s += `<path class="s2" d="M30 340 H500"/>`;
  for (let x = 30; x <= 500; x += 47) s += `<line class="s2" x1="${x}" y1="336" x2="${x}" y2="344"/>`;
  s += `</svg>`;
  return s;
}

// Human criterion: a lit desk at reception, open notebook.
function deskIll() {
  let s = `<svg class="ill" viewBox="0 0 560 520" aria-hidden="true">`;
  s += `<path class="w" d="M372 222 L412 222 L520 400 L300 400 Z" opacity=".09"/>`;
  s += `<path class="s" d="M80 400 H500 M100 400 V500 M480 400 V500 M100 432 H480"/>`;
  s += `<path class="s" d="M396 398 A26 6 0 0 0 448 398 M422 392 L376 300 L402 232"/>`;
  s += `<path class="s" d="M372 222 L412 222 L424 244 L380 250 Z"/>`;
  s += `<path class="s" d="M170 394 L250 380 L330 394 L250 404 Z M250 380 V404"/>`;
  for (let i = 0; i < 4; i++) s += `<line class="s2" x1="${186 + i * 4}" y1="${390 - i * 2}" x2="${236}" y2="${384 - i * 2 + 4}"/>`;
  s += `<rect class="s" x="120" y="384" width="30" height="14" rx="2"/>`;
  s += `<path class="s2" d="M60 500 H520"/>`;
  s += `</svg>`;
  return s;
}

// Small landscape used inside the site mockup
function heroIll() {
  let s = `<svg class="ill" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">`;
  for (let i = 0; i < 30; i++) s += `<circle class="dot" cx="${(rnd() * 800).toFixed(0)}" cy="${(20 + rnd() * 170).toFixed(0)}" r=".7" opacity=".5"/>`;
  s += `<circle class="s" cx="560" cy="150" r="80" opacity=".7"/>`;
  s += `<line class="s" x1="0" y1="300" x2="800" y2="300"/>`;
  s += `<path class="s" d="M220 250 H760 M230 254 V300 M750 254 V300"/>`;
  for (let x = 246; x < 750; x += 22) s += `<line class="s" x1="${x}" y1="258" x2="${x}" y2="300" opacity=".6"/>`;
  s += `<ellipse class="s" cx="150" cy="232" rx="13" ry="68"/><line class="s" x1="150" y1="300" x2="150" y2="300"/>`;
  s += `<ellipse class="s" cx="180" cy="246" rx="10" ry="54"/>`;
  s += `</svg>`;
  return s;
}

/* ------------------------------------------------------------ frames */

const frames = [];
const frame = (n, title, cls, inner) =>
  frames.push(`<section class="frame f${pad(n)} ${cls}${n === 0 ? " on" : ""}" id="f${pad(n)}" data-title="${title}" aria-label="${pad(n)} ${title}"><div class="fin">${inner}</div></section>`);

// 00 — Portada
frame(0, "Portada", "dark", `
  <div class="art" data-img="cover">${coverIll()}</div>
  <div class="shade"></div>
  <div class="logo-wrap"><div class="logo-slot" data-img="logo"></div></div>
  <div class="copy">
    <span class="lbl">Propuesta comercial</span>
    <h1>Rincón de Pilar</h1>
    <p class="sub">Sitio web y automatización de WhatsApp</p>
    <p class="lead">Lo que ya incluye el sitio web desarrollado para Rincón de Pilar, las mejoras que se le pueden sumar a futuro, y dos alternativas para automatizar la atención por WhatsApp.</p>
    <div class="meta"><span class="lbl">Septiembre 2026</span></div>
  </div>`);

// 01 — Introducción
frame(1, "Introducción", "", `
  <div class="split">
    <div class="copy">
      ${lbl(1, "Introducción")}
      <h2>Del primer clic a una consulta real.</h2>
      <p class="lead">Un sitio a medida, con diseño premium/editorial, pensado para transmitir el nivel del espacio y convertir visitas en consultas reales.</p>
      <p class="small">Este documento resume lo que ya incluye el sitio web desarrollado para Rincón de Pilar, las mejoras que se le pueden sumar a futuro, y dos alternativas para automatizar la atención por WhatsApp.</p>
    </div>
    <div class="illbox" data-img="intro">${introIll()}</div>
  </div>`);

// 02 — Visión general
const X = (x) => (x / 10).toFixed(1) + "%";
const Y = (y) => ((y / 520) * 100).toFixed(2) + "%";
const ins = [[100, "Buscadores", "SEO", 6], [200, "Celular, tablet y PC", "Responsive", 5], [310, "WhatsApp", "Botón en todo el sitio", 9], [420, "Formulario de contacto", "Propio", 7]];
const outs = [[70, "Panel de consultas", "Formulario", 7], [165, "Mensaje automático", "Opción A", 10], [260, "Recepcionista digital", "Opción B", 11], [355, "Recepción", "Personas", 13], [450, "Mejoras opcionales", "A futuro", 8]];
let eco = `<svg viewBox="0 0 1000 520" preserveAspectRatio="none" aria-hidden="true">`;
eco += `<circle class="ring2" cx="500" cy="260" r="150" vector-effect="non-scaling-stroke"/>`;
ins.forEach(([y, , , ], i) => (eco += `<path class="ln${i === 2 ? " sig" : ""}" vector-effect="non-scaling-stroke" d="M205 ${y} C300 ${y} 300 260 392 260"/>`));
outs.forEach(([y], i) => (eco += `<path class="ln${i === 2 ? " sig" : ""}" vector-effect="non-scaling-stroke" d="M608 260 C700 260 700 ${y} 795 ${y}"/>`));
eco += `<path class="ln sig" vector-effect="non-scaling-stroke" d="M788 262 C770 290 770 330 788 350"/>`;
eco += `</svg>`;
eco += `<svg viewBox="0 0 1000 520" preserveAspectRatio="xMidYMid meet" aria-hidden="true"><circle class="ring" cx="500" cy="260" r="108"/><circle cx="392" cy="260" r="3" fill="#1557D6"/><circle cx="608" cy="260" r="3" fill="#1557D6"/></svg>`;
ins.forEach(([y, n, k, go]) => (eco += `<button type="button" class="node in" data-go="${go}" style="left:${X(190)};top:${Y(y)}"><span class="n">${n}</span><span class="k">${k}</span></button>`));
outs.forEach(([y, n, k, go]) => (eco += `<button type="button" class="node out" data-go="${go}" style="left:${X(810)};top:${Y(y)}"><span class="n">${n}</span><span class="k">${k}</span></button>`));
eco += `<button type="button" class="node core" data-go="4" style="left:50%;top:50%"><span class="k">Núcleo</span><span class="n">Sitio web<br>Rincón de Pilar</span><span class="k">Inicio · Espacio · Eventos · Servicios · Galería · Contacto</span></button>`;
frame(2, "Visión general", "", `
  <div class="head">${lbl(2, "Visión general")}<h2>Un sitio en el centro. La atención, conectada.</h2></div>
  <div>
    <div class="eco-wrap"><div class="eco-cols"><span class="cap">Entradas</span><span class="cap">Núcleo</span><span class="cap">Servicios</span></div><div class="eco">${eco}</div></div>
  </div>
  <div class="eco-foot"><p class="small">Cada punto del diagrama lleva a su pantalla. En azul, el recorrido de una consulta por WhatsApp hasta recepción.</p><span class="cap">Opción A y Opción B son alternativas</span></div>`);

// 03 — Recorrido
frame(3, "Recorrido", "warm", `
  <div class="head">${lbl(3, "Recorrido")}<h2>Cómo llega una consulta.</h2></div>
  <div class="journey" style="--jy:47px">
    <div class="step"><span class="v">Encuentra</span><span class="tick"></span><p class="small">Aparece en buscadores.</p><span class="ap">Se apoya en: SEO</span></div>
    <div class="step"><span class="v">Recorre</span><span class="tick"></span><p class="small">El Espacio, los Eventos, los Servicios y la Galería completa, desde celular, tablet o PC.</p><span class="ap">Se apoya en: diseño responsive</span></div>
    <div class="step"><span class="v">Día / Noche</span><span class="tick"></span><p class="small">Cambia la portada entre modo Día y modo Noche.</p><span class="ap">Se apoya en: selector en la portada</span></div>
    <div class="step sig"><span class="v">Consulta</span><span class="tick"></span><p class="small">Por WhatsApp, con el botón presente en todo el sitio, o con el formulario de contacto propio.</p><span class="ap">Se apoya en: botón de WhatsApp · formulario</span></div>
    <div class="step"><span class="v">Se ordena</span><span class="tick"></span><p class="small">Las consultas del formulario llegan a un panel para organizarlas.</p><span class="ap">Se apoya en: panel de consultas</span></div>
  </div>`);

// 04 — Estructura del sitio
frame(4, "Estructura del sitio", "", `
  <div class="mock">
    <div class="browser">
      <div class="bar"><i></i><i></i><i></i><span class="url">rincon-de-pilar.vercel.app</span></div>
      <div class="site-nav"><span class="e">Rincón de Pilar</span><span class="links">Inicio · El Espacio · Eventos · Servicios · Galería · Contacto</span></div>
      <div class="site-hero" data-img="site-hero">${heroIll()}<span class="t">Rincón de Pilar</span><span class="dn"><span class="e">DÍA</span><span class="sw"></span><span class="e">NOCHE</span></span></div>
      <div class="site-row"><div></div><div></div><div></div><div></div></div>
    </div>
    ${LEGEND}
  </div>
  <div class="head">
    ${lbl(4, "El sitio web · Qué incluye")}
    <h2>Estructura del sitio.</h2>
    <p class="small">Sitio a medida, con diseño premium/editorial.</p>
    <ul class="struct">
      <li><span class="i">01</span><span class="e">Inicio</span><span class="x">Con selector de modo Día / Noche en la portada.</span></li>
      <li><span class="i">02</span><span class="e">El Espacio</span><span class="x">Instalaciones, capacidades, amenities.</span></li>
      <li><span class="i">03</span><span class="e">Eventos</span><span class="x">Casamientos, Fiestas de 15, Corporativos, Celebraciones especiales.</span></li>
      <li><span class="i">04</span><span class="e">Servicios</span><span class="x">Proveedores autorizados de catering, DJs y ambientación.</span></li>
      <li><span class="i">05</span><span class="e">Galería</span><span class="x">Galería completa de fotos.</span></li>
      <li><span class="i">06</span><span class="e">Ubicación y Contacto</span><span class="x">Con formulario propio.</span></li>
    </ul>
    <a class="live" href="https://rincon-de-pilar.vercel.app/" target="_blank" rel="noopener">Ver el sitio · rincon-de-pilar.vercel.app ↗</a>
  </div>`);

// 05 — Funcionalidad incluida
frame(5, "Funcionalidad incluida", "glass", `
  <div class="mock" style="display:grid;justify-items:center">
    <div class="phone"><div class="scr">
      <div class="top"><span class="e">Rincón de Pilar</span><span class="e">Menú</span></div>
      <div class="gal"><i></i><i></i><i></i><i></i><i></i><i></i></div>
      <div class="form"><span>Nombre</span><span>Tipo de evento</span><span>Mensaje</span><b>Enviar consulta</b></div>
      <div class="wa">WA</div>
    </div></div>
    ${LEGEND}
  </div>
  <div class="head">
    ${lbl(5, "El sitio web · Funcionalidad ya incluida")}
    <h2>Pensado para convertir visitas en consultas.</h2>
    <ul class="feats">
      <li>Botón de WhatsApp directo en todo el sitio</li>
      <li>Formulario de contacto integrado</li>
      <li>Galería fotográfica completa, optimizada para que cargue rápido</li>
      <li>Panel para organizar las consultas que llegan por el formulario</li>
      <li>Optimizado para aparecer en buscadores (SEO)</li>
      <li>Funciona perfecto en celular, tablet y PC</li>
      <li>Accesible (cumple estándares web internacionales)</li>
    </ul>
    <div class="est"><span class="lbl">Tiempo estimado</span><span class="v">2 días</span><span></span><span class="small">Una vez hecha la selección de imágenes.</span></div>
  </div>`);

// 06 — Resultado medido
const C = 2 * Math.PI * 44;
const ring = (v, name) => `<div class="ringc"><svg viewBox="0 0 100 100" aria-hidden="true"><circle class="track" cx="50" cy="50" r="44"/><circle class="val" cx="50" cy="50" r="44" stroke-dasharray="${((v / 100) * C).toFixed(2)} ${C.toFixed(2)}" transform="rotate(-90 50 50)"/><text x="50" y="58" text-anchor="middle" font-size="24">${v}</text></svg><span class="lbl">${name}</span></div>`;
frame(6, "Resultado medido", "", `
  <div class="head">${lbl(6, "El sitio web · Resultado medido")}<h2>Resultado medido.</h2>
    <p class="small">Puntaje sobre 100 en la auditoría técnica de Google (Lighthouse) para el sitio de escritorio: velocidad de carga, accesibilidad, buenas prácticas y posicionamiento.</p></div>
  <div class="rings">${ring(99, "Performance")}${ring(100, "Accesibilidad")}${ring(100, "Buenas prácticas")}${ring(100, "SEO")}</div>
  <div class="figs">
    <div class="fig"><div class="v">58</div><span class="lbl">Fotos en la galería</span></div>
    <div class="fig"><div class="v">7</div><span class="lbl">Secciones / tipos de evento</span></div>
    <div class="fig"><div class="v">100%</div><span class="lbl">Responsive, celular incluido</span></div>
  </div>`);

// 07 — Panel de consultas
const rows = [["03.09", "Lucía F.", "Casamiento", 1], ["03.09", "Estudio Ríos", "Corporativo", 0], ["02.09", "Carla M.", "Fiesta de 15", 0], ["01.09", "Diego P.", "Celebración", 0], ["31.08", "Ana y Tomás", "Casamiento", 0]];
frame(7, "Panel de consultas", "", `
  <div class="head">
    ${lbl(7, "El sitio web · Panel de consultas")}
    <h2>Cada consulta del formulario, en un solo lugar.</h2>
    <p class="lead">Panel para organizar las consultas que llegan por el formulario.</p>
    <div class="flowmini"><span class="cap">Formulario del sitio</span><span class="ar"></span><span class="cap">Panel de consultas</span></div>
  </div>
  <div class="mock">
    <div class="browser">
      <div class="bar"><i></i><i></i><i></i><span class="url">Panel · Consultas</span></div>
      <div class="panel">
        <div class="list">
          <div class="prow hd"><span class="e">Fecha</span><span class="e">Nombre</span><span class="e">Evento</span></div>
          ${rows.map(([d, n, e, s]) => `<div class="prow${s ? " sel" : ""}"><span class="dt">${d}</span><span class="e">${n}</span><span class="ev">${e}</span></div>`).join("")}
        </div>
        <div class="det"><span class="k">Consulta</span><span class="e">Lucía F. · Casamiento</span><span class="k">Mensaje</span><span class="e">Quería saber disponibilidad para el otoño y qué incluye el salón.</span><span class="k">Recibida por</span><span class="e">Formulario de contacto</span></div>
      </div>
    </div>
    ${LEGEND}
  </div>`);

// 08 — Qué se le puede sumar
frame(8, "Qué se le puede sumar", "", `
  <div class="left">
    <div class="head">${lbl(8, "Próximos pasos posibles")}<h2>Qué se le puede sumar a la web.</h2>
      <p class="small">Mejoras opcionales, para ir sumando en el tiempo según necesidad. No hace falta hacerlas todas juntas.</p></div>
    <div class="illbox" data-img="adds" style="max-width:440px">${stackIll()}</div>
  </div>
  <dl class="adds">
    <div><dt>Sistema de reservas online</dt><dd>Calendario de disponibilidad real, para que el cliente vea fechas libres sin escribir.</dd></div>
    <div><dt>Mapa interactivo</dt><dd>Mapa real embebido, con la ubicación exacta y cómo llegar.</dd></div>
    <div><dt>Blog / novedades</dt><dd>Sección de eventos realizados, para mostrar trabajo reciente y mejorar el posicionamiento en Google.</dd></div>
    <div><dt>Versión en inglés</dt><dd>Para consultas de clientes extranjeros o eventos corporativos internacionales.</dd></div>
    <div><dt>Integración con Instagram</dt><dd>Traer automáticamente las últimas fotos publicadas a la Galería.</dd></div>
    <div><dt>Analíticas de visitas</dt><dd>Saber cuánta gente entra al sitio, desde dónde y qué páginas mira más.</dd></div>
  </dl>`);

// 09 — Automatización de WhatsApp
frame(9, "Automatización de WhatsApp", "warm", `
  <div class="head">${lbl(9, "Atención automatizada")}<h2>Dos formas de automatizar la atención por WhatsApp.</h2>
    <p class="lead">Con distinto nivel de alcance. Se puede arrancar con la más simple y pasar a la completa más adelante.</p></div>
  <div class="scale">
    <button type="button" class="opt" data-go="10"><span class="lbl">Opción A</span><h3>Mensaje automático</h3><p class="small">Un mensaje predeterminado que responde ni bien alguien escribe. Siempre responde lo mismo.</p></button>
    <div class="mid"><span class="arrow"></span><span class="cap">Más alcance</span></div>
    <button type="button" class="opt" data-go="11"><span class="lbl">Opción B</span><h3>Recepcionista digital personalizado</h3><p class="small">Contesta, filtra, arma una base de datos de clientes y deriva a recepción.</p></button>
  </div>`);

// 10 — Opción A
frame(10, "Opción A · Mensaje automático", "", `
  <div class="opt-page" style="display:grid">
    <div class="copy">
      ${lbl(10, "Atención automatizada · Opción A")}
      <h2 class="opt-t">Mensaje automático.</h2>
      <p class="lead">Un mensaje predeterminado, redactado con inteligencia artificial, que responde automáticamente ni bien alguien escribe por WhatsApp: información básica del salón, horarios de atención y los datos de contacto para seguir la consulta.</p>
      <p class="note">Es un texto fijo: siempre responde lo mismo, no mantiene una conversación.</p>
      <div class="facts"><div><span class="lbl">Tiempo estimado</span><div class="v">3 a 5 días hábiles</div></div><div><span class="lbl">Forma de pago</span><div class="v">50% al inicio · 50% contra entrega</div></div></div>
    </div>
    <div class="mock" style="display:grid;justify-items:center">
      <div class="phone"><div class="scr">
        <div class="top"><span class="e">Rincón de Pilar</span><span class="e">WhatsApp</span></div>
        <div class="chat">
          <div class="bub me">Hola, quería hacer una consulta por el salón.</div>
          <div class="bub"><span class="who">Respuesta automática</span>Gracias por escribir a Rincón de Pilar. <span class="ph-note">[Información básica del salón]</span><br><br>Horarios de atención: <span class="ph-note">[a completar]</span><br>Para seguir la consulta: <span class="ph-note">[datos de contacto]</span></div>
        </div>
      </div></div>
      ${LEGEND}
    </div>
  </div>`);

// 11 — Opción B
frame(11, "Opción B · Recepcionista digital", "", `
  <div class="opt-page rev" style="display:grid">
    <div class="mock">
      <div class="mockpair">
        <div class="phone"><div class="scr">
          <div class="top"><span class="e">Rincón de Pilar</span><span class="e">WhatsApp</span></div>
          <div class="chat">
            <div class="bub me">Hola! Quiero info para una fiesta de 15.</div>
            <div class="bub">¡Hola! Con gusto. ¿Me decís tu nombre, la fecha que tienen en mente y cuántos invitados serían?</div>
            <div class="bub me">Martina. Sábado 14 de marzo, unos 120.</div>
            <div class="bub">Gracias, Martina. ¿Querés que te preparemos un presupuesto?</div>
            <div class="bub me">Sí, por favor.</div>
          </div>
        </div></div>
        <div class="ficha">
          <span class="cap" style="padding-bottom:10px">Base de datos de clientes</span>
          <div><span class="k">Nombre</span><span class="e">Martina R.</span></div>
          <div><span class="k">Tipo de evento</span><span class="e">Fiesta de 15</span></div>
          <div><span class="k">Fecha</span><span class="e">Sábado 14 de marzo</span></div>
          <div><span class="k">Cantidad de invitados</span><span class="e">120</span></div>
          <div><span class="k">Siguiente paso</span><span class="e blue">Pidió presupuesto → recepción</span></div>
        </div>
      </div>
      ${LEGEND}
    </div>
    <div class="copy">
      ${lbl(11, "Atención automatizada · Opción B")}
      <h2 class="opt-t">Recepcionista digital personalizado.</h2>
      <p class="small">Un sistema que contesta todos los WhatsApp que entran, filtra de qué se trata cada consulta y arma una base de datos de clientes con la información que va pidiendo (nombre, tipo de evento, fecha, cantidad de invitados). Cuando detecta que el cliente está realmente interesado o pide un presupuesto, deriva automáticamente la conversación a recepción.</p>
      <p class="note">Habla como Rincón quiera: el tono, el estilo y las respuestas se configuran a medida, no es un mensaje genérico.</p>
      <div class="facts"><div><span class="lbl">Tiempo estimado</span><div class="v">2 a 3 semanas</div></div><div><span class="lbl">Forma de pago</span><div class="v">50% al inicio · 50% contra entrega</div></div></div>
    </div>
  </div>`);

// 12 — Conexión
frame(12, "Conexión", "", `
  <div class="head">${lbl(12, "Conexión · Opción B")}<h2>Un mensaje entra una vez. Llega ordenado a recepción.</h2>
    <p class="small">Lo que el cliente cuenta en la conversación queda registrado en la base de datos de clientes y acompaña la consulta hasta que la toma recepción.</p></div>
  <div class="conn">
    <svg class="track" viewBox="0 0 1000 12" preserveAspectRatio="none" aria-hidden="true"><line class="base" x1="0" y1="4" x2="1000" y2="4" vector-effect="non-scaling-stroke"/><line class="sig" x1="0" y1="4" x2="840" y2="4" pathLength="1000" vector-effect="non-scaling-stroke"/></svg>
    <div class="st"><span class="v">Entra</span><p class="small">Alguien escribe por WhatsApp.</p></div>
    <div class="st"><span class="v">Contesta</span><p class="small">El sistema contesta todos los WhatsApp que entran.</p></div>
    <div class="st"><span class="v">Filtra</span><p class="small">Identifica de qué se trata cada consulta.</p></div>
    <div class="st"><span class="v">Registra</span><p class="small">Arma la base de datos de clientes con lo que va pidiendo:</p><ul class="fields"><li>Nombre</li><li>Tipo de evento</li><li>Fecha</li><li>Cantidad de invitados</li></ul></div>
    <div class="st"><span class="v">Detecta</span><p class="small">Reconoce cuándo el cliente está realmente interesado o pide un presupuesto.</p></div>
    <div class="st"><span class="v">Deriva</span><p class="small">Pasa automáticamente la conversación a recepción.</p></div>
  </div>`);

// 13 — Continuidad entre roles
frame(13, "Continuidad entre roles", "glass", `
  <div class="head">${lbl(13, "Continuidad")}<h2>El sistema responde primero. Recepción sigue la conversación.</h2></div>
  <div class="lanes">
    <div class="who"><span class="lbl">Rol</span><h3>Recepcionista digital</h3><span class="cap">Opción B</span></div>
    <div class="cell"><span class="v">Contesta todos los WhatsApp que entran.</span></div>
    <div class="cell"><span class="v">Filtra la consulta y pide nombre, tipo de evento, fecha y cantidad de invitados.</span></div>
    <div class="cell"><span class="v">Detecta interés o pedido de presupuesto y deriva.</span></div>
    <div class="who"><span class="lbl">Rol</span><h3>Recepción</h3><span class="cap">Personas</span></div>
    <div class="cell empty"><div class="dash"></div></div>
    <div class="cell empty"><div class="dash"></div></div>
    <div class="cell hand"><span class="v">Recibe la conversación con los datos del cliente y la continúa.</span></div>
    <div class="who"><span class="lbl">Herramienta</span><h3>Panel de consultas</h3><span class="cap">Sitio web</span></div>
    <div class="cell"><span class="v">Ordena las consultas que llegan por el formulario del sitio.</span></div>
    <div class="cell empty"><div class="dash"></div></div>
    <div class="cell"><span class="v">Recepción las retoma desde el panel.</span></div>
  </div>
  <p class="small">Se puede arrancar con la opción más simple, el mensaje automático, y pasar a la completa más adelante.</p>`);

// 14 — Seguridad y criterio humano
frame(14, "Seguridad y criterio humano", "dark", `
  <div class="left">
    ${lbl(14, "Seguridad y criterio humano")}
    <p class="quote">La transformación es digital. El criterio sigue siendo humano.</p>
    <div class="cols">
      <div><span class="lbl">Ciberseguridad</span><p class="small">El sistema reúne datos de clientes: nombre, tipo de evento, fecha y cantidad de invitados. Cuidarlos es parte del proyecto desde el inicio.</p></div>
      <div><span class="lbl">Personas detrás del sistema</span><p class="small">Cuando un cliente está realmente interesado o pide un presupuesto, la conversación pasa a recepción. El tono, el estilo y las respuestas los define Rincón de Pilar.</p></div>
    </div>
    <div class="foot"><span class="cap">Medidas técnicas específicas a definir con Rincón de Pilar</span></div>
  </div>
  <div class="illbox" data-img="human">${deskIll()}</div>`);

// 15 — Impacto
const ben = (v, on) => `<div class="ben"><span class="v">${v}</span><span class="ap"><b>Se apoya en:</b>${on}</span></div>`;
frame(15, "Impacto", "", `
  <div class="head">${lbl(15, "Impacto")}<h2>Qué cambia, y para quién.</h2></div>
  <div class="impact">
    <div class="col"><span class="lbl">Quien busca dónde celebrar</span>
      ${ben("Encuentra el salón cuando lo busca.", "optimización para buscadores (SEO).")}
      ${ben("Recorre el espacio desde el celular, sin esperas.", "diseño responsive y galería optimizada.")}
      ${ben("Recibe respuesta apenas escribe por WhatsApp.", "Opción A u Opción B.")}
    </div>
    <div class="col"><span class="lbl">Recepción</span>
      ${ben("Tiene las consultas del formulario ordenadas.", "panel de consultas.")}
      ${ben("Recibe a los clientes interesados con sus datos ya reunidos.", "Opción B y base de datos de clientes.")}
    </div>
    <div class="col"><span class="lbl">Rincón de Pilar</span>
      ${ben("Transmite el nivel del espacio.", "diseño premium/editorial y galería completa.")}
      ${ben("Convierte visitas en consultas reales.", "botón de WhatsApp en todo el sitio y formulario integrado.")}
      ${ben("Atiende con su propia voz.", "tono, estilo y respuestas configurados a medida (Opción B).")}
      ${ben("Crece por etapas.", "mejoras opcionales, sin hacerlas todas juntas.")}
    </div>
  </div>`);

// 16 — Implementación
frame(16, "Implementación", "", `
  <div class="head">${lbl(16, "Implementación")}<h2>Cómo avanzamos.</h2></div>
  <div class="steps">
    <div><span class="n">01</span><span class="v">Selección de imágenes</span><p class="small">El punto de partida para cerrar el sitio.</p></div>
    <div><span class="n">02</span><span class="v">Sitio web</span><p class="small">Estructura y funcionalidad incluida, listas para recibir consultas.</p></div>
    <div><span class="n">03</span><span class="v">Atención por WhatsApp</span><p class="small">Elegir entre Opción A y Opción B. Se puede empezar por la más simple.</p></div>
    <div><span class="n">04</span><span class="v">Voz de Rincón</span><p class="small">En la Opción B, configurar tono, estilo y respuestas a medida.</p></div>
    <div><span class="n">05</span><span class="v">Mejoras opcionales</span><p class="small">Se suman en el tiempo, según necesidad.</p></div>
  </div>
  <div class="pay">
    <div><span class="lbl">Plazos</span><p class="v" style="margin-top:8px">Los plazos se definen tras el relevamiento.</p><p class="small" style="margin-top:8px">Los tiempos estimados de cada pieza figuran en su pantalla.</p></div>
    <div><span class="lbl">Forma de pago</span><p class="v" style="margin-top:8px">50% para arrancar, 50% cuando el producto final está entregado y funcionando.</p><p class="small" style="margin-top:8px">Aplica a ambas opciones de automatización de WhatsApp.</p></div>
  </div>`);

if (frames.length !== TOTAL + 1) throw new Error("frame count " + frames.length);

/* ------------------------------------------------------------ page */
const chevron = (d) => `<svg viewBox="0 0 14 14" aria-hidden="true"><path d="${d}"/></svg>`;
const src = `<title>Propuesta Rincón de Pilar</title>
<style>${css}</style>
<main id="deck" aria-live="polite">${frames.join("\n")}</main>
<header class="chrome topbar"><span class="mono who">Propuesta comercial · Rincón de Pilar</span><div style="display:flex;gap:22px;align-items:center"><button type="button" id="copyCur" class="tbtn">Copiar enlace</button><span class="mono count"><b id="cur">00</b> / <span id="tot">${pad(TOTAL)}</span></span></div></header>
<nav class="chrome botbar" aria-label="Navegación"><button type="button" id="idxBtn" class="tbtn">Índice</button><div class="sel" id="sel"></div><button type="button" id="editBtn" class="tbtn" hidden>Editar</button><div class="nav2"><button type="button" id="prev" aria-label="Anterior">${chevron("M9 2 L4 7 L9 12")}</button><button type="button" id="next" aria-label="Siguiente">${chevron("M5 2 L10 7 L5 12")}</button></div></nav>
<div id="scrim"></div>
<aside id="idx" aria-label="Índice" inert><div class="ih"><span class="mono">Índice · ${pad(TOTAL + 1)} pantallas</span><button type="button" id="idxClose" class="tbtn">Cerrar</button></div><div class="il" id="il"></div></aside>
<div id="editbar" hidden><span>Modo edición</span><span class="es" id="editst"></span><button type="button" id="saveBtn">Guardar</button><button type="button" id="cancelBtn">Salir sin guardar</button></div>
<div id="toast" role="status"></div>
<script type="application/json" id="ov">{}</script>
<script>${js}</script>
`;
if (/<\/script/i.test(js)) throw new Error("script contains closing tag");
const b64 = Buffer.from(src, "utf8").toString("base64");
const out = src + `<script type="text/x-b64" id="__src">${b64}</script>\n`;
writeFileSync(join(here, "index.html"), out);
// standalone copy with a document skeleton, for static hosting
writeFileSync(join(here, "standalone.html"), `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"></head><body>${out}</body></html>`);
console.log("ok", (out.length / 1024).toFixed(0) + "KB");
