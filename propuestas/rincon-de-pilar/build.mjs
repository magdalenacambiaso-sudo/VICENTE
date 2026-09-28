// Builds index.html: Bravo's proposal deck for Rincón de Pilar.
// Usage: node build.mjs [artifact-url]
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const css = readFileSync(join(here, "page.css"), "utf8");
const js = readFileSync(join(here, "page.js"), "utf8").replace("__LINK_BASE__", process.argv[2] || "__LINK_BASE__");
const asset = (f) => `data:image/${f.endsWith(".png") ? "png" : "jpeg"};base64,` + readFileSync(join(here, "assets", f)).toString("base64");

const A = {
  bravo: asset("bravo.png"),
  rincon: asset("rincon-wordmark.png"),
  rinconLight: asset("rincon-stack-light.png"),
  pattern: asset("rincon-pattern.png"),
  vista: asset("foto-vista.jpg"),
  pareja: asset("foto-pareja.jpg"),
  fiesta: asset("foto-fiesta.jpg"),
};

const TOTAL = 18;
const pad = (n) => String(n).padStart(2, "0");
const LEGEND = `<span class="legend">Visualización conceptual / datos ficticios</span>`;
const lbl = (t) => `<span class="lbl">${t}</span>`;
const logo = (src, cls, alt) => `<div class="logo ${cls}"><img src="${src}" alt="${alt}"></div>`;
const bravoLogo = (cls = "bravo") => logo(A.bravo, cls, "Bravo");
const rinconLogo = (cls = "rlogo") => logo(A.rincon, cls, "Rincón de Pilar");
const photo = (key, src, cls = "") => `<figure class="photo ${cls}"><div class="pimg" data-img="${key}"><img src="${src}" alt=""></div></figure>`;

/* ------------------------------------------------------------ frames */
const frames = [];
const frame = (n, title, cls, inner) =>
  frames.push(`<section class="frame f${pad(n)} ${cls}${n === 0 ? " on" : ""}" id="f${pad(n)}" data-title="${title}" aria-label="${pad(n)} ${title}"><div class="fin">${inner}</div></section>`);

// 00 — Portada: Bravo signs, Rincón is the subject, the place itself carries the image.
frame(0, "Portada", "", `
  <div class="side">
    ${bravoLogo()}
    <div class="body-c">
      <div class="for">
        ${lbl("Propuesta comercial para")}
        ${rinconLogo()}
      </div>
      <h1>Sitio web y automatización de WhatsApp.</h1>
      <p class="small">Lo que ya incluye el sitio web desarrollado para Rincón de Pilar, las mejoras que se le pueden sumar a futuro, y dos alternativas para automatizar la atención por WhatsApp.</p>
      <div class="meta"><span class="lbl">Septiembre 2026</span><span class="lbl">Bravo para Rincón de Pilar</span></div>
    </div>
  </div>
  ${photo("vista", A.vista, "slow")}`);

// 01 — Introducción: the goal is a real event, so one real moment of one.
frame(1, "Introducción", "", `
  <div class="copy">
    ${lbl("Introducción")}
    <h2>Del primer clic a una consulta real<span class="sq"></span></h2>
    <p class="lead">Un sitio a medida, con diseño premium/editorial, pensado para transmitir el nivel del espacio y convertir visitas en consultas reales.</p>
    <p class="small">Este documento resume lo que ya incluye el sitio web desarrollado para Rincón de Pilar, las mejoras que se le pueden sumar a futuro, y dos alternativas para automatizar la atención por WhatsApp.</p>
  </div>
  ${photo("pareja", A.pareja, "slow")}`);

// 02 — Visión general
const X = (x) => (x / 10).toFixed(1) + "%";
const Y = (y) => ((y / 480) * 100).toFixed(2) + "%";
const ins = [[90, "Buscadores", "SEO", 7], [190, "Celular, tablet y PC", "Responsive", 6], [290, "WhatsApp", "Botón en todo el sitio", 10], [390, "Formulario de contacto", "Propio", 8]];
const outs = [[60, "Panel de consultas", "Formulario", 8], [150, "Mensaje automático", "Opción A", 11], [240, "Recepcionista digital", "Opción B", 12], [330, "Recepción", "Personas", 14], [420, "Mejoras opcionales", "A futuro", 9]];
let eco = `<svg viewBox="0 0 1000 480" preserveAspectRatio="none" aria-hidden="true">`;
ins.forEach(([y], i) => (eco += `<path class="ln${i === 2 ? " sig" : ""}" vector-effect="non-scaling-stroke" d="M205 ${y} C300 ${y} 300 240 392 240"/>`));
outs.forEach(([y], i) => (eco += `<path class="ln${i === 2 ? " sig" : ""}" vector-effect="non-scaling-stroke" d="M608 240 C700 240 700 ${y} 795 ${y}"/>`));
eco += `<path class="ln sig" vector-effect="non-scaling-stroke" d="M788 252 C772 280 772 312 788 328"/>`;
eco += `</svg>`;
eco += `<svg viewBox="0 0 1000 480" preserveAspectRatio="xMidYMid meet" aria-hidden="true"><circle class="ring" cx="500" cy="240" r="108"/><rect x="389" y="237" width="6" height="6" fill="#1557D6"/><rect x="605" y="237" width="6" height="6" fill="#1557D6"/></svg>`;
ins.forEach(([y, n, k, go]) => (eco += `<button type="button" class="node in" data-go="${go}" style="left:${X(190)};top:${Y(y)}"><span class="n">${n}</span><span class="k">${k}</span></button>`));
outs.forEach(([y, n, k, go]) => (eco += `<button type="button" class="node out" data-go="${go}" style="left:${X(810)};top:${Y(y)}"><span class="n">${n}</span><span class="k">${k}</span></button>`));
eco += `<button type="button" class="node core" data-go="5" style="left:50%;top:50%"><span class="k">Núcleo</span><span class="n">Sitio web<br>Rincón de Pilar</span></button>`;
frame(2, "Visión general", "", `
  <div class="head">${lbl("Visión general")}<h2>Un sitio en el centro. La atención, conectada.</h2></div>
  <div class="eco-wrap"><div class="eco-cols"><span class="cap">Entradas</span><span class="cap">Núcleo</span><span class="cap">Servicios</span></div><div class="eco">${eco}</div></div>
  <p class="small">Cada punto lleva a su pantalla. En azul, el recorrido de una consulta por WhatsApp hasta recepción. Opción A y Opción B son alternativas.</p>`);

// 03 — Recorrido
frame(3, "Recorrido", "warm", `
  <div class="head">${lbl("Recorrido")}<h2>Cómo llega una consulta.</h2></div>
  <div class="journey">
    <div class="step"><span class="v">Encuentra</span><span class="tick"></span><p class="small">Aparece en buscadores.</p><span class="ap">Se apoya en: SEO</span></div>
    <div class="step"><span class="v">Recorre</span><span class="tick"></span><p class="small">El Espacio, los Eventos, los Servicios y la Galería completa, desde celular, tablet o PC.</p><span class="ap">Se apoya en: diseño responsive</span></div>
    <div class="step"><span class="v">Día / Noche</span><span class="tick"></span><p class="small">Cambia la portada entre modo Día y modo Noche.</p><span class="ap">Se apoya en: selector en la portada</span></div>
    <div class="step sig"><span class="v">Consulta</span><span class="tick"></span><p class="small">Por WhatsApp, con el botón presente en todo el sitio, o con el formulario de contacto propio.</p><span class="ap">Se apoya en: botón de WhatsApp · formulario</span></div>
    <div class="step"><span class="v">Se ordena</span><span class="tick"></span><p class="small">Las consultas del formulario llegan a un panel para organizarlas.</p><span class="ap">Se apoya en: panel de consultas</span></div>
  </div>`);

// 04 — Divisor: El sitio web (Rincón's ground and type)
frame(4, "El sitio web", "topo divider", `
  <div style="display:flex;justify-content:space-between;align-items:start;gap:24px">${lbl("01 / El sitio web")}${logo(A.rinconLight, "", "Rincón de Pilar")}</div>
  <p class="big rise">El sitio web.</p>
  <div class="foot rise d2">
    <p class="small">Sitio a medida, con diseño premium/editorial, pensado para transmitir el nivel del espacio y convertir visitas en consultas reales.</p>
    <div class="toc"><button type="button" data-go="5">Estructura</button><button type="button" data-go="6">Funcionalidad</button><button type="button" data-go="7">Resultado medido</button><button type="button" data-go="8">Panel de consultas</button></div>
  </div>`);

// 05 — Estructura del sitio
frame(5, "Estructura del sitio", "", `
  <div class="mock">
    <div class="browser">
      <div class="bar"><i></i><i></i><i></i><span class="url">rincon-de-pilar.vercel.app</span></div>
      <div class="site-nav">${logo(A.rincon, "", "Rincón de Pilar")}<span class="links">Inicio · El Espacio · Eventos · Servicios · Galería · Contacto</span></div>
      <div class="site-hero">${logo(A.rinconLight, "", "Rincón de Pilar")}<span class="dn"><span class="e">DÍA</span><span class="sw"></span><span class="e">NOCHE</span></span></div>
      <div class="site-row"><span>Casamientos</span><span>Fiestas de 15</span><span>Corporativos</span><span>Celebraciones especiales</span></div>
    </div>
    ${LEGEND}
  </div>
  <div class="head">
    ${lbl("01 / El sitio web · Qué incluye")}
    <h2>Estructura del sitio.</h2>
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

// 06 — Funcionalidad incluida: typographic, one big figure.
frame(6, "Funcionalidad incluida", "", `
  <div class="left">
    <div class="head">${lbl("01 / El sitio web · Funcionalidad ya incluida")}<h2>Pensado para convertir visitas en consultas.</h2></div>
    <div class="est"><span class="lbl">Tiempo estimado</span><span class="v">2 días</span><p class="small">Una vez hecha la selección de imágenes.</p></div>
  </div>
  <ul class="feats">
    <li>Botón de WhatsApp directo en todo el sitio</li>
    <li>Formulario de contacto integrado</li>
    <li>Galería fotográfica completa, optimizada para que cargue rápido</li>
    <li>Panel para organizar las consultas que llegan por el formulario</li>
    <li>Optimizado para aparecer en buscadores (SEO)</li>
    <li>Funciona perfecto en celular, tablet y PC</li>
    <li>Accesible (cumple estándares web internacionales)</li>
  </ul>`);

// 07 — Resultado medido
const C = 2 * Math.PI * 44;
const ring = (v, name) => `<div class="ringc"><svg viewBox="0 0 100 100" aria-hidden="true"><circle class="track" cx="50" cy="50" r="44"/><circle class="val" cx="50" cy="50" r="44" stroke-dasharray="${((v / 100) * C).toFixed(2)} ${C.toFixed(2)}" transform="rotate(-90 50 50)"/><text x="50" y="58" text-anchor="middle" font-size="24">${v}</text></svg><span class="lbl">${name}</span></div>`;
frame(7, "Resultado medido", "", `
  <div class="head">${lbl("01 / El sitio web · Resultado medido")}<h2>Resultado medido.</h2>
    <p class="small">Puntaje sobre 100 en la auditoría técnica de Google (Lighthouse) para el sitio de escritorio: velocidad de carga, accesibilidad, buenas prácticas y posicionamiento.</p></div>
  <div class="rings">${ring(99, "Performance")}${ring(100, "Accesibilidad")}${ring(100, "Buenas prácticas")}${ring(100, "SEO")}</div>
  <div class="figs">
    <div class="fig"><div class="v">58</div><span class="lbl">Fotos en la galería</span></div>
    <div class="fig"><div class="v">7</div><span class="lbl">Secciones / tipos de evento</span></div>
    <div class="fig"><div class="v">100%</div><span class="lbl">Responsive, celular incluido</span></div>
  </div>`);

// 08 — Panel de consultas
const rows = [["03.09", "Lucía F.", "Casamiento", 1], ["03.09", "Estudio Ríos", "Corporativo", 0], ["02.09", "Carla M.", "Fiesta de 15", 0], ["01.09", "Diego P.", "Celebración", 0], ["31.08", "Ana y Tomás", "Casamiento", 0]];
frame(8, "Panel de consultas", "", `
  <div class="head">
    ${lbl("01 / El sitio web · Panel de consultas")}
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

// 09 — Qué se le puede sumar: typographic, no illustration.
frame(9, "Qué se le puede sumar", "", `
  <div class="head">${lbl("02 / Próximos pasos posibles")}<h2>Qué se le puede sumar a la web.</h2>
    <p class="small">Mejoras opcionales, para ir sumando en el tiempo según necesidad. No hace falta hacerlas todas juntas.</p></div>
  <dl class="adds">
    <div><dt>Sistema de reservas online</dt><dd>Calendario de disponibilidad real, para que el cliente vea fechas libres sin escribir.</dd></div>
    <div><dt>Mapa interactivo</dt><dd>Mapa real embebido, con la ubicación exacta y cómo llegar.</dd></div>
    <div><dt>Blog / novedades</dt><dd>Sección de eventos realizados, para mostrar trabajo reciente y mejorar el posicionamiento en Google.</dd></div>
    <div><dt>Versión en inglés</dt><dd>Para consultas de clientes extranjeros o eventos corporativos internacionales.</dd></div>
    <div><dt>Integración con Instagram</dt><dd>Traer automáticamente las últimas fotos publicadas a la Galería.</dd></div>
    <div><dt>Analíticas de visitas</dt><dd>Saber cuánta gente entra al sitio, desde dónde y qué páginas mira más.</dd></div>
  </dl>`);

// 10 — Divisor: Atención automatizada (ocre + Rincón pattern)
frame(10, "Automatización de WhatsApp", "ocre divider", `
  <div class="head">${lbl("03 / Atención automatizada")}<h2 class="rise">Dos formas de automatizar la atención por WhatsApp.</h2>
    <p class="lead rise d2">Con distinto nivel de alcance. Se puede arrancar con la más simple y pasar a la completa más adelante.</p></div>
  <div></div>
  <div class="scale">
    <button type="button" class="opt" data-go="11"><span class="lbl">Opción A</span><h3>Mensaje automático</h3><p class="small">Un mensaje predeterminado que responde ni bien alguien escribe. Siempre responde lo mismo.</p></button>
    <div class="mid"><span class="arrow"></span><span class="cap">Más alcance</span></div>
    <button type="button" class="opt" data-go="12"><span class="lbl">Opción B</span><h3>Recepcionista digital personalizado</h3><p class="small">Contesta, filtra, arma una base de datos de clientes y deriva a recepción.</p></button>
  </div>`);

// 11 — Opción A
frame(11, "Opción A · Mensaje automático", "", `
  <div class="opt-page">
    <div class="copy">
      ${lbl("03 / Atención automatizada · Opción A")}
      <h2 class="opt-t">Mensaje automático.</h2>
      <p class="lead">Un mensaje predeterminado, redactado con inteligencia artificial, que responde automáticamente ni bien alguien escribe por WhatsApp.</p>
      <p class="small">Incluye información básica del salón, horarios de atención y los datos de contacto para seguir la consulta.</p>
      <p class="note">Es un texto fijo: siempre responde lo mismo, no mantiene una conversación.</p>
      <div class="facts"><div><span class="lbl">Tiempo estimado</span><div class="v">3 a 5 días hábiles</div></div><div><span class="lbl">Forma de pago</span><div class="v">50% al inicio · 50% contra entrega</div></div></div>
    </div>
    <div class="mock" style="display:grid;justify-items:center">
      <div class="phone"><div class="scr">
        <div class="top">${logo(A.rincon, "", "Rincón de Pilar")}<span class="e">WhatsApp</span></div>
        <div class="chat">
          <div class="bub me">Hola, quería hacer una consulta por el salón.</div>
          <div class="bub"><span class="who">Respuesta automática</span>Gracias por escribir a Rincón de Pilar. <span class="ph-note">[Información básica del salón]</span><br><br>Horarios de atención: <span class="ph-note">[a completar]</span><br>Para seguir la consulta: <span class="ph-note">[datos de contacto]</span></div>
        </div>
      </div></div>
      ${LEGEND}
    </div>
  </div>`);

// 12 — Opción B
frame(12, "Opción B · Recepcionista digital", "", `
  <div class="opt-page rev">
    <div class="mock">
      <div class="mockpair">
        <div class="phone"><div class="scr">
          <div class="top">${logo(A.rincon, "", "Rincón de Pilar")}<span class="e">WhatsApp</span></div>
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
          <div><span class="k">Siguiente paso</span><span class="e">Pidió presupuesto → recepción</span></div>
        </div>
      </div>
      ${LEGEND}
    </div>
    <div class="copy">
      ${lbl("03 / Atención automatizada · Opción B")}
      <h2 class="opt-t">Recepcionista digital personalizado.</h2>
      <p class="small">Un sistema que contesta todos los WhatsApp que entran, filtra de qué se trata cada consulta y arma una base de datos de clientes con la información que va pidiendo (nombre, tipo de evento, fecha, cantidad de invitados). Cuando detecta que el cliente está realmente interesado o pide un presupuesto, deriva automáticamente la conversación a recepción.</p>
      <p class="note">Habla como Rincón quiera: el tono, el estilo y las respuestas se configuran a medida, no es un mensaje genérico.</p>
      <div class="facts"><div><span class="lbl">Tiempo estimado</span><div class="v">2 a 3 semanas</div></div><div><span class="lbl">Forma de pago</span><div class="v">50% al inicio · 50% contra entrega</div></div></div>
    </div>
  </div>`);

// 13 — Conexión
frame(13, "Conexión", "", `
  <div class="head">${lbl("03 / Atención automatizada · Conexión · Opción B")}<h2>Un mensaje entra una vez. Llega ordenado a recepción.</h2>
    <p class="small">Lo que el cliente cuenta en la conversación queda registrado en la base de datos de clientes y acompaña la consulta hasta que la toma recepción.</p></div>
  <div class="conn">
    <svg class="track" viewBox="0 0 1000 12" preserveAspectRatio="none" aria-hidden="true"><line class="base" x1="0" y1="4" x2="1000" y2="4" vector-effect="non-scaling-stroke"/><line class="sig" x1="0" y1="4" x2="836" y2="4" pathLength="1000" vector-effect="non-scaling-stroke"/></svg>
    <div class="st"><span class="v">Entra</span><p class="small">Alguien escribe por WhatsApp.</p></div>
    <div class="st"><span class="v">Contesta</span><p class="small">El sistema contesta todos los WhatsApp que entran.</p></div>
    <div class="st"><span class="v">Filtra</span><p class="small">Identifica de qué se trata cada consulta.</p></div>
    <div class="st"><span class="v">Registra</span><p class="small">Arma la base de datos de clientes con lo que va pidiendo:</p><ul class="fields"><li>Nombre</li><li>Tipo de evento</li><li>Fecha</li><li>Cantidad de invitados</li></ul></div>
    <div class="st"><span class="v">Detecta</span><p class="small">Reconoce cuándo el cliente está realmente interesado o pide un presupuesto.</p></div>
    <div class="st"><span class="v">Deriva</span><p class="small">Pasa automáticamente la conversación a recepción.</p></div>
  </div>`);

// 14 — Continuidad entre roles
frame(14, "Continuidad entre roles", "glass", `
  <div class="head">${lbl("Continuidad")}<h2>El sistema responde primero. Recepción sigue la conversación.</h2></div>
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

// 15 — Seguridad y criterio humano: the people the system serves.
frame(15, "Seguridad y criterio humano", "dark", `
  <div class="left">
    ${lbl("Seguridad y criterio humano")}
    <p class="quote rise">La transformación es digital. El criterio sigue siendo humano.</p>
    <div class="cols">
      <div><span class="lbl">Ciberseguridad</span><p class="small">El sistema reúne datos de clientes: nombre, tipo de evento, fecha y cantidad de invitados. Cuidarlos es parte del proyecto desde el inicio.</p></div>
      <div><span class="lbl">Personas detrás del sistema</span><p class="small">Cuando un cliente está realmente interesado o pide un presupuesto, la conversación pasa a recepción. El tono, el estilo y las respuestas los define Rincón de Pilar.</p></div>
    </div>
    <div class="foot"><span class="cap">Medidas técnicas específicas a definir con Rincón de Pilar</span></div>
  </div>
  ${photo("fiesta", A.fiesta, "slow")}`);

// 16 — Impacto
const ben = (v, on) => `<div class="ben"><span class="v">${v}</span><span class="ap"><b>Se apoya en:</b>${on}</span></div>`;
frame(16, "Impacto", "", `
  <div class="head">${lbl("Impacto")}<h2>Qué cambia, y para quién.</h2></div>
  <div class="impact">
    <div class="col"><span class="who">Quien busca dónde celebrar</span>
      ${ben("Encuentra el salón cuando lo busca.", "optimización para buscadores (SEO).")}
      ${ben("Recorre el espacio desde el celular, sin esperas.", "diseño responsive y galería optimizada.")}
      ${ben("Recibe respuesta apenas escribe por WhatsApp.", "Opción A u Opción B.")}
    </div>
    <div class="col"><span class="who">Recepción</span>
      ${ben("Tiene las consultas del formulario ordenadas.", "panel de consultas.")}
      ${ben("Recibe a los clientes interesados con sus datos ya reunidos.", "Opción B y base de datos de clientes.")}
    </div>
    <div class="col"><span class="who">Rincón de Pilar</span>
      ${ben("Transmite el nivel del espacio.", "diseño premium/editorial y galería completa.")}
      ${ben("Convierte visitas en consultas reales.", "botón de WhatsApp en todo el sitio y formulario integrado.")}
      ${ben("Atiende con su propia voz.", "tono, estilo y respuestas configurados a medida (Opción B).")}
      ${ben("Crece por etapas.", "mejoras opcionales, sin hacerlas todas juntas.")}
    </div>
  </div>`);

// 17 — Implementación
frame(17, "Implementación", "", `
  <div class="head">${lbl("Implementación")}<h2>Cómo avanzamos.</h2></div>
  <div class="steps">
    <div><span class="n">01</span><span class="v">Selección de imágenes</span><p class="small">El punto de partida para cerrar el sitio.</p></div>
    <div><span class="n">02</span><span class="v">Sitio web</span><p class="small">Estructura y funcionalidad incluida, listas para recibir consultas.</p></div>
    <div><span class="n">03</span><span class="v">Atención por WhatsApp</span><p class="small">Elegir entre Opción A y Opción B. Se puede empezar por la más simple.</p></div>
    <div><span class="n">04</span><span class="v">Voz de Rincón</span><p class="small">En la Opción B, configurar tono, estilo y respuestas a medida.</p></div>
    <div><span class="n">05</span><span class="v">Mejoras opcionales</span><p class="small">Se suman en el tiempo, según necesidad.</p></div>
  </div>
  <div class="pay">
    <div><span class="lbl">Plazos</span><p class="v">Los plazos se definen tras el relevamiento.</p><p class="small" style="margin-top:8px">Los tiempos estimados de cada pieza figuran en su pantalla.</p></div>
    <div><span class="lbl">Forma de pago</span><p class="v">50% para arrancar, 50% cuando el producto final está entregado y funcionando.</p><p class="small" style="margin-top:8px">Aplica a ambas opciones de automatización de WhatsApp.</p></div>
  </div>`);

// 18 — Cierre: Bravo's signature
frame(18, "Cierre", "", `
  ${bravoLogo()}
  <div class="close">
    <p class="t rise">Transformación digital a medida, con firma propia.</p>
    <p class="small rise d2">Una propuesta de Bravo para Rincón de Pilar.</p>
  </div>
  <div class="foot">${rinconLogo()}<span class="lbl">Septiembre 2026</span></div>`);

if (frames.length !== TOTAL + 1) throw new Error("frame count " + frames.length);

/* inject the Rincón pattern into the ocre divider */
frames[10] = frames[10].replace('<div class="fin">', `<div class="pattern" aria-hidden="true" style="--pat:url(${A.pattern})"></div><div class="fin">`);

/* ------------------------------------------------------------ page */
const chevron = (d) => `<svg viewBox="0 0 14 14" aria-hidden="true"><path d="${d}"/></svg>`;
const src = `<title>Propuesta Rincón de Pilar</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500&display=swap">
<style>${css}</style>
<main id="deck" aria-live="polite">${frames.join("\n")}</main>
<header class="chrome topbar"><span class="mono who">Bravo · Propuesta para Rincón de Pilar</span><div style="display:flex;gap:22px;align-items:center"><button type="button" id="copyCur" class="tbtn">Copiar enlace</button><span class="mono count"><b id="cur">00</b> / <span id="tot">${pad(TOTAL)}</span></span></div></header>
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
