// Builds the PDF version of the proposal: 16:9 pages on Rincón de Pilar's visual system,
// with Bravo as a small signature. Usage: node deck.mjs  (writes deck.html; render with render.cjs)
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const asset = (f) => {
  const ext = f.split(".").pop();
  const type = { png: "image/png", jpg: "image/jpeg", woff2: "font/woff2" }[ext];
  return `data:${type};base64,` + readFileSync(join(here, "..", "assets", f)).toString("base64");
};
const A = {
  font: asset("raleway.woff2"),
  bravo: asset("bravo.png"),
  rincon: asset("rincon-wordmark.png"),
  rinconLight: asset("rincon-stack-light.png"),
  pattern: asset("rincon-pattern.png"),
  vista: asset("foto-vista.jpg"),
  pareja: asset("foto-pareja.jpg"),
  fiesta: asset("foto-fiesta.jpg"),
};

const css = `
@font-face{font-family:"Raleway";src:url(${A.font}) format("woff2");font-weight:100 900;font-style:normal}
/* Rincón de Pilar system: light grey ground, warm grey, ocre accent, Raleway.
   Layout: warm-grey side panel holds the section and title; the light side holds content
   grouped under small labels with a rule, as in the Rincón brand manual. */
:root{--claro:#EBEBEB;--blanco:#F6F6F5;--calido:#6B6463;--ocre:#9E8364;--oscuro:#969696;--texto:#4E4847}
@page{size:1920px 1080px;margin:0}
*{box-sizing:border-box}
html,body{margin:0;padding:0;background:var(--claro)}
body{font-family:"Raleway",Verdana,sans-serif;color:var(--texto);-webkit-font-smoothing:antialiased;font-variant-numeric:lining-nums}
h1,h2,h3,p,ul,ol,dl,dd{margin:0;padding:0}
ul,ol{list-style:none}
.page{width:1920px;height:1080px;position:relative;overflow:hidden;background:var(--claro);page-break-after:always;break-after:page;display:grid;grid-template-columns:600px 1fr}
.page:last-child{page-break-after:auto;break-after:auto}

/* side panel */
.side{background:var(--calido);color:#fff;padding:96px 72px 80px;display:flex;flex-direction:column;gap:40px}
.side .sec{font-size:19px;font-weight:400;letter-spacing:.02em;color:#D6CFCB;padding-bottom:16px;border-bottom:1.5px solid #8C8482}
.side h2{font-size:62px;font-weight:300;line-height:1.1;letter-spacing:-.005em;color:#fff}
.side .intro{margin-top:auto;font-size:22px;line-height:1.55;font-weight:400;color:#E4DEDA}

/* main area */
.main{padding:96px 110px 150px;display:flex;flex-direction:column;justify-content:center;gap:56px;position:relative;min-width:0}
.narrow .foot > span:first-child{display:none}
.foot{position:absolute;left:110px;right:110px;bottom:52px;display:flex;align-items:center;justify-content:space-between;font-size:15px;color:var(--oscuro);letter-spacing:.02em}
.foot .r{display:flex;align-items:center;gap:26px}
.seal{display:flex;align-items:center;gap:12px;font-size:13px;color:var(--oscuro)}
.seal img{height:19px;width:auto;display:block}
.pn{font-variant-numeric:tabular-nums;color:var(--calido)}

/* groups: label + rule (Rincón manual) */
.lab{font-size:19px;font-weight:400;color:var(--calido);padding-bottom:14px;border-bottom:1.5px solid var(--oscuro);display:block}
.lab.oc{border-color:var(--ocre)}
.lead{font-size:34px;line-height:1.35;font-weight:300;color:var(--calido)}
.txt{font-size:23px;line-height:1.6;color:var(--texto)}
.sm{font-size:19px;line-height:1.55;color:#7A7372}
.tight .txt{font-size:20px;line-height:1.5}
.note{font-size:17px;color:var(--oscuro);letter-spacing:.02em}
.oc{color:var(--ocre)}
.grid2{display:grid;grid-template-columns:1fr 1fr;gap:56px 72px}
.grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:56px 60px}
.item{display:grid;gap:14px;align-content:start}
.item h3{font-size:30px;font-weight:400;color:var(--calido);line-height:1.2}
.num{font-size:17px;color:var(--ocre);font-weight:500;letter-spacing:.06em}
.big{font-size:128px;font-weight:300;line-height:.95;color:var(--calido);letter-spacing:-.02em}
.photo{position:relative;overflow:hidden;background:var(--calido)}
.photo img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.bw img{filter:grayscale(1) contrast(1.02)}

/* cover */
.cover{display:block;background:var(--claro)}
.band{position:absolute;left:0;right:0;height:300px;background:#D3D3D2;-webkit-mask:url(${A.pattern}) repeat 0 0/620px auto;mask:url(${A.pattern}) repeat 0 0/620px auto}
.band.t{top:0}.band.b{bottom:0}
.cover .mid{position:absolute;left:0;right:0;top:300px;bottom:300px;display:flex;align-items:center;justify-content:center;gap:88px}
.cover .rl{width:520px}
.cover .rl img,.logo img{display:block;width:100%;height:auto}
.cover .vr{width:1.5px;height:250px;background:var(--ocre)}
.cover .tx{display:grid;gap:18px;width:560px}
.cover .tx .k{font-size:21px;color:var(--oscuro);letter-spacing:.02em}
.cover .tx h1{font-size:48px;font-weight:500;line-height:1.15;color:var(--calido)}
.cover .tx .d{font-size:26px;font-weight:300;color:var(--oscuro)}
.cover .sealbox{position:absolute;right:96px;bottom:108px;background:var(--claro);padding:18px 24px;display:flex;align-items:center;gap:16px;font-size:16px;color:var(--calido)}
.cover .sealbox img{height:24px;width:auto}

/* dividers */
.div{grid-template-columns:1fr 1fr}
.div .dl{background:var(--calido);color:#fff;padding:96px 96px 110px;display:flex;flex-direction:column}
.div .dl .n{font-size:220px;font-weight:200;line-height:.9;color:#fff;opacity:.9}
.div .dl h2{font-size:84px;font-weight:300;line-height:1.05;margin-top:36px}
.div .dl p{margin-top:auto;font-size:24px;line-height:1.55;color:#E4DEDA;max-width:30ch}
.div .dl .sec{font-size:19px;color:#D6CFCB;margin-bottom:auto;padding-bottom:16px;border-bottom:1.5px solid #8C8482}
.div.ocre .dl{background:var(--ocre)}
.div.ocre .dl .sec{color:#F0E8DE;border-color:#B8A184}
.div.ocre .dl p{color:#F5EEE6}
.div .pat{background:var(--claro);position:relative}
.div .pat::before{content:"";position:absolute;inset:0;background:#CDCDCC;-webkit-mask:url(${A.pattern}) repeat 0 0/620px auto;mask:url(${A.pattern}) repeat 0 0/620px auto}
.div .pat .inner{position:absolute;left:96px;right:96px;top:50%;transform:translateY(-50%);background:var(--claro);padding:56px 60px;display:grid;gap:28px}

/* mockups (flat, Rincón greys) */
.phone{width:330px;height:660px;border:2px solid #B9B9B8;border-radius:44px;padding:12px;background:var(--blanco)}
.phone .scr{height:100%;border-radius:32px;border:1.5px solid #D6D6D5;overflow:hidden;display:flex;flex-direction:column;background:var(--blanco)}
.phone .top{padding:22px 22px 16px;border-bottom:1.5px solid #DDDDDC;display:flex;justify-content:space-between;align-items:center;font-size:13px;color:var(--oscuro)}
.phone .top img{height:14px;width:auto}
.chat{flex:1;background:var(--claro);padding:18px 16px;display:grid;gap:12px;align-content:start;font-size:15px;line-height:1.45;color:var(--texto)}
.bub{max-width:86%;background:#fff;padding:11px 14px;border-left:2px solid var(--ocre)}
.bub.me{justify-self:end;background:#DCDCDB;border:0}
.bub .w{display:block;font-size:12px;color:var(--oscuro);margin-bottom:4px;letter-spacing:.03em}
.ph{color:var(--oscuro)}
.cap{font-size:15px;color:var(--oscuro);letter-spacing:.03em}
.browser{border:1.5px solid #B9B9B8;background:var(--blanco)}
.browser .bar{height:36px;border-bottom:1.5px solid #DDDDDC;display:flex;align-items:center;gap:8px;padding:0 16px;font-size:13px;color:var(--oscuro)}
.browser .bar i{width:9px;height:9px;border:1.5px solid #B9B9B8;border-radius:50%}
.browser .bar span{margin-left:14px}
.prow{display:grid;grid-template-columns:90px 1fr 190px;padding:16px 24px;border-bottom:1.5px solid #E0E0DF;font-size:17px;align-items:baseline}
.prow.hd{font-size:14px;color:var(--oscuro);letter-spacing:.04em}
.prow .d{color:var(--oscuro)}
.prow .e{color:var(--ocre)}
.prow.sel{background:#E4E1DC}

/* tables */
.cmp{display:grid;grid-template-columns:230px 1fr 1fr;border-top:1.5px solid var(--calido)}
.cmp > div{padding:24px 28px 26px 0;border-bottom:1.5px solid #CFCFCE;font-size:21px;line-height:1.5}
.cmp .rh{font-size:17px;color:var(--oscuro);letter-spacing:.02em;padding-top:28px}
.cmp .ch{font-size:34px;font-weight:300;color:var(--calido);line-height:1.2;padding-top:30px}
.cmp .ch small{display:block;font-size:17px;color:var(--ocre);font-weight:500;letter-spacing:.06em;margin-bottom:10px}
.flow{display:grid;grid-template-columns:repeat(6,1fr);gap:28px;position:relative}
.flow::before{content:"";position:absolute;left:0;right:0;top:9px;height:1.5px;background:var(--oscuro)}
.flow > div{display:grid;gap:14px;align-content:start;position:relative;padding-top:44px}
.flow > div::before{content:"";position:absolute;top:2px;left:0;width:16px;height:16px;border-radius:50%;background:var(--claro);border:1.5px solid var(--calido)}
.flow > div.last::before{background:var(--ocre);border-color:var(--ocre)}
.flow h3{font-size:30px;font-weight:400;color:var(--calido)}
.lanes{display:grid;grid-template-columns:250px repeat(3,1fr);border-top:1.5px solid var(--calido)}
.lanes > div{padding:26px 24px 28px 0;border-bottom:1.5px solid #CFCFCE;font-size:21px;line-height:1.45}
.lanes .who{font-size:24px;color:var(--calido)}
.lanes .who small{display:block;font-size:15px;color:var(--oscuro);margin-top:6px}
.lanes .hand{border-left:3px solid var(--ocre);padding-left:20px}
.lanes .none{color:#BDBDBC}
`;

/* ------------------------------------------------------------ helpers */
const TOTAL_LABEL = "Propuesta comercial · Rincón de Pilar";
const pages = [];
let pno = 0;
const foot = () => `<div class="foot"><span>${TOTAL_LABEL}</span><span class="r"><span class="seal"><span>Propuesta de</span><img src="${A.bravo}" alt="Bravo"></span><span class="pn">${String(pno).padStart(2, "0")}</span></span></div>`;
const std = (sec, title, main, intro = "") => {
  pages.push(`<section class="page"><aside class="side"><span class="sec">${sec}</span><h2>${title}</h2>${intro ? `<p class="intro">${intro}</p>` : ""}</aside><div class="main">${main}${foot()}</div></section>`);
  pno++;
};
const raw = (html) => { pages.push(html); pno++; };
const legend = `<span class="cap">Visualización conceptual / datos ficticios</span>`;

/* ------------------------------------------------------------ 00 Portada */
raw(`<section class="page cover">
  <div class="band t"></div><div class="band b"></div>
  <div class="mid">
    <div class="rl"><img src="${A.rincon}" alt="Rincón de Pilar"></div>
    <div class="vr"></div>
    <div class="tx">
      <span class="k">Propuesta comercial</span>
      <h1>Sitio web y automatización de WhatsApp</h1>
      <span class="d">Septiembre 2026</span>
    </div>
  </div>
  <div class="sealbox"><span>Una propuesta de</span><img src="${A.bravo}" alt="Bravo"></div>
</section>`);

/* ------------------------------------------------------------ 01 Contenido */
std("Contenido", "Qué incluye esta propuesta", `
  <div class="grid2" style="margin-top:12px">
    <div class="item"><span class="num">01</span><span class="lab">El sitio web</span><p class="txt">Qué incluye el sitio desarrollado para Rincón de Pilar, cómo está organizado y el resultado medido.</p></div>
    <div class="item"><span class="num">02</span><span class="lab">Próximos pasos posibles</span><p class="txt">Mejoras opcionales para sumar a la web en el tiempo, según necesidad.</p></div>
    <div class="item"><span class="num">03</span><span class="lab">Atención automatizada</span><p class="txt">Dos alternativas para automatizar la atención por WhatsApp, con distinto nivel de alcance.</p></div>
    <div class="item"><span class="num">04</span><span class="lab">Implementación</span><p class="txt">Cómo avanzamos, plazos y forma de pago.</p></div>
  </div>`,
  "Este documento resume lo que ya incluye el sitio web desarrollado para Rincón de Pilar, las mejoras que se le pueden sumar a futuro, y dos alternativas para automatizar la atención por WhatsApp.");

/* ------------------------------------------------------------ 02 Introducción (photo) */
raw(`<section class="page" style="grid-template-columns:600px 1fr 640px">
  <aside class="side"><span class="sec">Introducción</span><h2>Del primer clic a una consulta real.</h2></aside>
  <div class="main narrow">
    <p class="lead">Un sitio a medida, con diseño premium/editorial, pensado para transmitir el nivel del espacio y convertir visitas en consultas reales.</p>
    <div class="item"><span class="lab">El objetivo</span><p class="txt">Que quien busca dónde celebrar encuentre a Rincón de Pilar, recorra el espacio y haga su consulta.</p></div>
    ${foot()}
  </div>
  <div class="photo bw"><img src="${A.pareja}" alt="" style="object-position:45% 30%"></div>
</section>`);

/* ------------------------------------------------------------ 03 Visión general */
const inN = [["Buscadores", "SEO"], ["Celular, tablet y PC", "Responsive"], ["WhatsApp", "Botón en todo el sitio"], ["Formulario de contacto", "Propio"]];
const outN = [["Panel de consultas", "Formulario"], ["Mensaje automático", "Opción A"], ["Recepcionista digital", "Opción B"], ["Recepción", "Personas"], ["Mejoras opcionales", "A futuro"]];
let d = `<svg viewBox="0 0 1100 600" width="1100" height="600" style="display:block;font-family:Raleway">`;
const iy = (i) => 90 + i * 140, oy = (i) => 60 + i * 120;
inN.forEach(([n, k], i) => {
  d += `<path d="M300 ${iy(i)} C400 ${iy(i)} 400 300 450 300" fill="none" stroke="${i === 2 ? "#9E8364" : "#AFAFAE"}" stroke-width="${i === 2 ? 2.5 : 1.5}"/>`;
  d += `<text x="280" y="${iy(i) - 4}" text-anchor="end" font-size="23" fill="#6B6463">${n}</text><text x="280" y="${iy(i) + 24}" text-anchor="end" font-size="15" fill="#969696">${k}</text>`;
});
outN.forEach(([n, k], i) => {
  d += `<path d="M650 300 C700 300 700 ${oy(i)} 800 ${oy(i)}" fill="none" stroke="${i === 2 ? "#9E8364" : "#AFAFAE"}" stroke-width="${i === 2 ? 2.5 : 1.5}"/>`;
  d += `<text x="820" y="${oy(i) - 4}" font-size="23" fill="#6B6463">${n}</text><text x="820" y="${oy(i) + 24}" font-size="15" fill="#969696">${k}</text>`;
});
d += `<path d="M810 ${oy(2) + 34} C790 ${oy(2) + 60} 790 ${oy(3) - 50} 810 ${oy(3) - 26}" fill="none" stroke="#9E8364" stroke-width="2.5"/>`;
d += `<circle cx="550" cy="300" r="100" fill="#6B6463"/><text x="550" y="292" text-anchor="middle" font-size="22" fill="#fff" font-weight="400">Sitio web</text><text x="550" y="322" text-anchor="middle" font-size="22" fill="#fff" font-weight="400">Rincón de Pilar</text>`;
d += `</svg>`;
std("Visión general", "Un sitio en el centro. La atención, conectada.", `
  <div style="display:flex;justify-content:space-between;width:1100px"><span class="cap">Entradas</span><span class="cap">Núcleo</span><span class="cap">Servicios</span></div>
  <div style="margin-top:-28px">${d}</div>
  <p class="sm">En ocre, el recorrido de una consulta por WhatsApp hasta recepción. Opción A y Opción B son alternativas.</p>`);

/* ------------------------------------------------------------ 04 Recorrido */
const steps = [
  ["Encuentra", "Aparece en buscadores.", "SEO"],
  ["Recorre", "El Espacio, los Eventos, los Servicios y la Galería completa, desde celular, tablet o PC.", "diseño responsive"],
  ["Día / Noche", "Cambia la portada entre modo Día y modo Noche.", "selector en la portada"],
  ["Consulta", "Por WhatsApp, con el botón presente en todo el sitio, o con el formulario de contacto propio.", "botón de WhatsApp · formulario"],
  ["Se ordena", "Las consultas del formulario llegan a un panel para organizarlas.", "panel de consultas"],
];
std("Recorrido", "Cómo llega una consulta.", `
  <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:36px;margin-top:40px">
    ${steps.map(([t, x, s], i) => `<div class="item"><span class="num">${String(i + 1).padStart(2, "0")}</span><span class="lab ${i === 3 ? "oc" : ""}" style="font-size:26px;color:#6B6463">${t}</span><p class="sm" style="color:#4E4847">${x}</p><p class="note">Se apoya en: ${s}</p></div>`).join("")}
  </div>`, "Del buscador a la consulta, en cinco pasos.");

/* ------------------------------------------------------------ 05 Divider: El sitio web (photo) */
raw(`<section class="page div">
  <div class="dl"><span class="sec">Sección</span><span class="n">01</span><h2>El sitio web</h2><p>Sitio a medida, con diseño premium/editorial, pensado para transmitir el nivel del espacio y convertir visitas en consultas reales.</p></div>
  <div class="photo"><img src="${A.vista}" alt="" style="object-position:30% 55%"></div>
</section>`);

/* ------------------------------------------------------------ 06 Estructura */
const est = [["Inicio", "Con selector de modo Día / Noche en la portada."], ["El Espacio", "Instalaciones, capacidades, amenities."], ["Eventos", "Casamientos, Fiestas de 15, Corporativos, Celebraciones especiales."], ["Servicios", "Proveedores autorizados de catering, DJs y ambientación."], ["Galería", "Galería completa de fotos."], ["Ubicación y Contacto", "Con formulario propio."]];
std("01 · El sitio web", "Estructura del sitio.", `
  <div class="grid3" style="margin-top:20px">
    ${est.map(([t, x], i) => `<div class="item"><span class="num">${String(i + 1).padStart(2, "0")}</span><span class="lab" style="font-size:28px">${t}</span><p class="txt">${x}</p></div>`).join("")}
  </div>
  <p class="sm">Sitio en línea: rincon-de-pilar.vercel.app</p>`, "Seis secciones, pensadas para recorrer el espacio y llegar a la consulta.");

/* ------------------------------------------------------------ 07 Funcionalidad */
const feats = ["Botón de WhatsApp directo en todo el sitio", "Formulario de contacto integrado", "Galería fotográfica completa, optimizada para que cargue rápido", "Panel para organizar las consultas que llegan por el formulario", "Optimizado para aparecer en buscadores (SEO)", "Funciona perfecto en celular, tablet y PC", "Accesible (cumple estándares web internacionales)"];
std("01 · El sitio web", "Funcionalidad ya incluida.", `
  <div style="display:grid;grid-template-columns:1.25fr .75fr;gap:96px;align-items:start">
    <div><span class="lab">Incluye</span><ul>${feats.map((f) => `<li class="txt" style="padding:15px 0;border-bottom:1.5px solid #D2D2D1">${f}</li>`).join("")}</ul></div>
    <div class="item"><span class="lab">Tiempo estimado</span><span class="big" style="margin-top:18px">2 días</span><p class="txt">Una vez hecha la selección de imágenes.</p></div>
  </div>`, "Pensado para convertir visitas en consultas.");

/* ------------------------------------------------------------ 08 Resultado medido */
const C = 2 * Math.PI * 70;
const ring = (v, n) => `<div class="item" style="justify-items:start"><svg width="170" height="170" viewBox="0 0 170 170"><circle cx="85" cy="85" r="70" fill="none" stroke="#D2D2D1" stroke-width="3"/><circle cx="85" cy="85" r="70" fill="none" stroke="#9E8364" stroke-width="3" stroke-dasharray="${((v / 100) * C).toFixed(1)} ${C.toFixed(1)}" transform="rotate(-90 85 85)"/><text x="85" y="98" text-anchor="middle" font-family="Raleway" font-size="42" font-weight="300" fill="#6B6463">${v}</text></svg><span class="txt" style="color:#6B6463">${n}</span></div>`;
std("01 · El sitio web", "Resultado medido.", `
  <div><span class="lab">Auditoría técnica de Google (Lighthouse) · sitio de escritorio</span>
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:40px;margin-top:40px">${ring(99, "Performance")}${ring(100, "Accesibilidad")}${ring(100, "Buenas prácticas")}${ring(100, "SEO")}</div></div>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:40px">
    <div class="item"><span class="lab">Galería</span><span class="big" style="font-size:96px">58</span><span class="sm">fotos en la galería</span></div>
    <div class="item"><span class="lab">Contenido</span><span class="big" style="font-size:96px">7</span><span class="sm">secciones / tipos de evento</span></div>
    <div class="item"><span class="lab">Dispositivos</span><span class="big" style="font-size:96px">100%</span><span class="sm">responsive, celular incluido</span></div>
  </div>`, "Puntaje sobre 100 en la auditoría técnica de Google (Lighthouse) para el sitio de escritorio: velocidad de carga, accesibilidad, buenas prácticas y posicionamiento.");

/* ------------------------------------------------------------ 09 Panel de consultas */
const rows = [["03.09", "Lucía F.", "Casamiento", 1], ["03.09", "Estudio Ríos", "Corporativo", 0], ["02.09", "Carla M.", "Fiesta de 15", 0], ["01.09", "Diego P.", "Celebración", 0], ["31.08", "Ana y Tomás", "Casamiento", 0]];
std("01 · El sitio web", "Panel de consultas.", `
  <div style="display:grid;grid-template-columns:.8fr 1.2fr;gap:72px;align-items:start">
    <div class="item"><span class="lab">Qué hace</span><p class="txt">Panel para organizar las consultas que llegan por el formulario.</p>
      <p class="sm" style="margin-top:18px">Formulario del sitio &nbsp;→&nbsp; Panel de consultas</p></div>
    <div><div class="browser"><div class="bar"><i></i><i></i><i></i><span>Panel · Consultas</span></div>
      <div class="prow hd"><span>Fecha</span><span>Nombre</span><span>Evento</span></div>
      ${rows.map(([dd, n, e, s]) => `<div class="prow${s ? " sel" : ""}"><span class="d">${dd}</span><span>${n}</span><span class="e">${e}</span></div>`).join("")}
      <div style="height:40px"></div></div>
      <div style="margin-top:16px">${legend}</div></div>
  </div>`, "Cada consulta del formulario, en un solo lugar.");

/* ------------------------------------------------------------ 10 Qué se le puede sumar */
const adds = [["Sistema de reservas online", "Calendario de disponibilidad real, para que el cliente vea fechas libres sin escribir."], ["Mapa interactivo", "Mapa real embebido, con la ubicación exacta y cómo llegar."], ["Blog / novedades", "Sección de eventos realizados, para mostrar trabajo reciente y mejorar el posicionamiento en Google."], ["Versión en inglés", "Para consultas de clientes extranjeros o eventos corporativos internacionales."], ["Integración con Instagram", "Traer automáticamente las últimas fotos publicadas a la Galería."], ["Analíticas de visitas", "Saber cuánta gente entra al sitio, desde dónde y qué páginas mira más."]];
std("02 · Próximos pasos posibles", "Qué se le puede sumar a la web.", `
  <div class="grid3" style="margin-top:20px">
    ${adds.map(([t, x]) => `<div class="item"><span class="lab" style="font-size:26px">${t}</span><p class="txt">${x}</p></div>`).join("")}
  </div>`, "Mejoras opcionales, para ir sumando en el tiempo según necesidad. No hace falta hacerlas todas juntas.");

/* ------------------------------------------------------------ 11 Divider: Atención automatizada */
raw(`<section class="page div ocre">
  <div class="dl"><span class="sec">Sección</span><span class="n">03</span><h2>Atención automatizada</h2><p>Dos formas de automatizar la atención por WhatsApp, con distinto nivel de alcance.</p></div>
  <div class="pat"><div class="inner">
    <span class="lab oc">Opción A</span><p class="lead" style="margin-top:-8px">Mensaje automático</p>
    <span class="lab oc" style="margin-top:16px">Opción B</span><p class="lead" style="margin-top:-8px">Recepcionista digital personalizado</p>
    <p class="sm" style="margin-top:8px">Se puede arrancar con la más simple y pasar a la completa más adelante.</p>
  </div></div>
</section>`);

/* ------------------------------------------------------------ 12 Comparación */
std("03 · Atención automatizada", "Las dos opciones, lado a lado.", `
  <div class="cmp">
    <div></div><div class="ch"><small>OPCIÓN A</small>Mensaje automático</div><div class="ch"><small>OPCIÓN B</small>Recepcionista digital personalizado</div>
    <div class="rh">Qué es</div><div>Un mensaje predeterminado, redactado con inteligencia artificial, que responde automáticamente ni bien alguien escribe por WhatsApp.</div><div>Un sistema que contesta todos los WhatsApp que entran, filtra de qué se trata cada consulta y arma una base de datos de clientes.</div>
    <div class="rh">Alcance</div><div>Es un texto fijo: siempre responde lo mismo, no mantiene una conversación.</div><div>Cuando detecta interés o un pedido de presupuesto, deriva automáticamente la conversación a recepción. Tono, estilo y respuestas a medida.</div>
    <div class="rh">Tiempo estimado</div><div>3 a 5 días hábiles</div><div>2 a 3 semanas</div>
    <div class="rh">Forma de pago</div><div>50% al inicio · 50% contra entrega</div><div>50% al inicio · 50% contra entrega</div>
  </div>`, "Se puede arrancar con la más simple y pasar a la completa más adelante.");

/* ------------------------------------------------------------ 13 Opción A */
const phone = (bubbles) => `<div class="phone"><div class="scr"><div class="top"><img src="${A.rincon}" alt="Rincón de Pilar"><span>WhatsApp</span></div><div class="chat">${bubbles}</div></div></div>`;
std("03 · Atención automatizada · Opción A", "Mensaje automático.", `
  <div style="display:grid;grid-template-columns:1fr 360px;gap:96px;align-items:center">
    <div style="display:grid;gap:40px">
      <div class="item"><span class="lab">Qué es</span><p class="txt">Un mensaje predeterminado, redactado con inteligencia artificial, que responde automáticamente ni bien alguien escribe por WhatsApp: información básica del salón, horarios de atención y los datos de contacto para seguir la consulta.</p></div>
      <div class="item"><span class="lab">Alcance</span><p class="txt">Es un texto fijo: siempre responde lo mismo, no mantiene una conversación.</p></div>
      <div class="grid2" style="gap:40px"><div class="item"><span class="lab">Tiempo estimado</span><p class="lead">3 a 5 días hábiles</p></div><div class="item"><span class="lab">Forma de pago</span><p class="lead">50% al inicio · 50% contra entrega</p></div></div>
    </div>
    <div style="display:grid;gap:14px;justify-items:center">${phone(`<div class="bub me">Hola, quería hacer una consulta por el salón.</div><div class="bub"><span class="w">Respuesta automática</span>Gracias por escribir a Rincón de Pilar. <span class="ph">[Información básica del salón]</span><br><br>Horarios de atención: <span class="ph">[a completar]</span><br>Para seguir la consulta: <span class="ph">[datos de contacto]</span></div>`)}${legend}</div>
  </div>`);

/* ------------------------------------------------------------ 14 Opción B */
std("03 · Atención automatizada · Opción B", "Recepcionista digital personalizado.", `
  <div style="display:grid;grid-template-columns:1fr 340px 240px;gap:48px;align-items:center">
    <div style="display:grid;gap:28px" class="tight">
      <div class="item"><span class="lab">Qué es</span><p class="txt">Un sistema que contesta todos los WhatsApp que entran, filtra de qué se trata cada consulta y arma una base de datos de clientes con la información que va pidiendo (nombre, tipo de evento, fecha, cantidad de invitados). Cuando detecta que el cliente está realmente interesado o pide un presupuesto, deriva automáticamente la conversación a recepción.</p></div>
      <div class="item"><span class="lab">A medida</span><p class="txt">Habla como Rincón quiera: el tono, el estilo y las respuestas se configuran a medida, no es un mensaje genérico.</p></div>
      <div class="item"><span class="lab">Tiempo estimado · Forma de pago</span><p class="lead" style="font-size:28px">2 a 3 semanas · 50% al inicio, 50% contra entrega</p></div>
    </div>
    <div style="display:grid;gap:14px;justify-items:center">${phone(`<div class="bub me">Hola! Quiero info para una fiesta de 15.</div><div class="bub">¡Hola! Con gusto. ¿Me decís tu nombre, la fecha que tienen en mente y cuántos invitados serían?</div><div class="bub me">Martina. Sábado 14 de marzo, unos 120.</div><div class="bub">Gracias, Martina. ¿Querés que te preparemos un presupuesto?</div><div class="bub me">Sí, por favor.</div>`)}${legend}</div>
    <div style="display:grid;gap:0">
      <span class="lab oc" style="font-size:17px">Base de datos de clientes</span>
      ${[["Nombre", "Martina R."], ["Tipo de evento", "Fiesta de 15"], ["Fecha", "Sábado 14 de marzo"], ["Invitados", "120"], ["Siguiente paso", "Pidió presupuesto → recepción"]].map(([k, v]) => `<div style="padding:14px 0;border-bottom:1.5px solid #D2D2D1"><div class="cap">${k}</div><div style="font-size:19px;color:#4E4847;margin-top:4px">${v}</div></div>`).join("")}
    </div>
  </div>`);

/* ------------------------------------------------------------ 15 Conexión */
const fl = [["Entra", "Alguien escribe por WhatsApp."], ["Contesta", "El sistema contesta todos los WhatsApp que entran."], ["Filtra", "Identifica de qué se trata cada consulta."], ["Registra", "Arma la base de datos de clientes con lo que va pidiendo: nombre, tipo de evento, fecha y cantidad de invitados."], ["Detecta", "Reconoce cuándo el cliente está realmente interesado o pide un presupuesto."], ["Deriva", "Pasa automáticamente la conversación a recepción."]];
std("03 · Atención automatizada · Opción B", "Un mensaje entra una vez. Llega ordenado a recepción.", `
  <div class="flow" style="margin-top:60px">${fl.map(([t, x], i) => `<div class="${i === 5 ? "last" : ""}"><span class="num">${String(i + 1).padStart(2, "0")}</span><h3>${t}</h3><p class="sm" style="color:#4E4847">${x}</p></div>`).join("")}</div>`,
  "Lo que el cliente cuenta en la conversación queda registrado en la base de datos de clientes y acompaña la consulta hasta que la toma recepción.");

/* ------------------------------------------------------------ 16 Continuidad */
std("Continuidad entre roles", "El sistema responde primero. Recepción sigue la conversación.", `
  <div class="lanes">
    <div class="who">Recepcionista digital<small>Opción B</small></div><div>Contesta todos los WhatsApp que entran.</div><div>Filtra la consulta y pide nombre, tipo de evento, fecha y cantidad de invitados.</div><div>Detecta interés o pedido de presupuesto y deriva.</div>
    <div class="who">Recepción<small>Personas</small></div><div class="none">—</div><div class="none">—</div><div class="hand">Recibe la conversación con los datos del cliente y la continúa.</div>
    <div class="who">Panel de consultas<small>Sitio web</small></div><div>Ordena las consultas que llegan por el formulario del sitio.</div><div class="none">—</div><div>Recepción las retoma desde el panel.</div>
  </div>`, "Se puede arrancar con la opción más simple, el mensaje automático, y pasar a la completa más adelante.");

/* ------------------------------------------------------------ 17 Seguridad y criterio humano (photo) */
raw(`<section class="page" style="grid-template-columns:1fr 760px">
  <div class="main" style="padding:110px 110px 150px 110px;justify-content:center;gap:64px">
    <span class="lab" style="max-width:640px">Seguridad y criterio humano</span>
    <p style="font-size:66px;font-weight:300;line-height:1.12;color:#6B6463;max-width:18ch">La transformación es digital. El criterio sigue siendo humano.</p>
    <div class="grid2" style="gap:56px">
      <div class="item"><span class="lab oc">Ciberseguridad</span><p class="sm" style="color:#4E4847">El sistema reúne datos de clientes: nombre, tipo de evento, fecha y cantidad de invitados. Cuidarlos es parte del proyecto desde el inicio.</p></div>
      <div class="item"><span class="lab oc">Personas detrás del sistema</span><p class="sm" style="color:#4E4847">Cuando un cliente está realmente interesado o pide un presupuesto, la conversación pasa a recepción. El tono, el estilo y las respuestas los define Rincón de Pilar.</p></div>
    </div>
    <p class="note">Medidas técnicas específicas a definir con Rincón de Pilar.</p>
    ${foot()}
  </div>
  <div class="photo bw"><img src="${A.fiesta}" alt="" style="object-position:50% 45%"></div>
</section>`);

/* ------------------------------------------------------------ 18 Impacto */
const ben = (v, on) => `<div style="padding:18px 0 20px;border-bottom:1.5px solid #D2D2D1;display:grid;gap:8px"><span style="font-size:23px;color:#4E4847;line-height:1.35">${v}</span><span class="note">Se apoya en: ${on}</span></div>`;
std("Impacto", "Qué cambia, y para quién.", `
  <div class="grid3" style="gap:56px">
    <div><span class="lab oc" style="font-size:24px">Quien busca dónde celebrar</span>
      ${ben("Encuentra el salón cuando lo busca.", "optimización para buscadores (SEO).")}
      ${ben("Recorre el espacio desde el celular, sin esperas.", "diseño responsive y galería optimizada.")}
      ${ben("Recibe respuesta apenas escribe por WhatsApp.", "Opción A u Opción B.")}</div>
    <div><span class="lab oc" style="font-size:24px">Recepción</span>
      ${ben("Tiene las consultas del formulario ordenadas.", "panel de consultas.")}
      ${ben("Recibe a los clientes interesados con sus datos ya reunidos.", "Opción B y base de datos de clientes.")}</div>
    <div><span class="lab oc" style="font-size:24px">Rincón de Pilar</span>
      ${ben("Transmite el nivel del espacio.", "diseño premium/editorial y galería completa.")}
      ${ben("Convierte visitas en consultas reales.", "botón de WhatsApp en todo el sitio y formulario integrado.")}
      ${ben("Atiende con su propia voz.", "tono, estilo y respuestas configurados a medida (Opción B).")}
      ${ben("Crece por etapas.", "mejoras opcionales, sin hacerlas todas juntas.")}</div>
  </div>`);

/* ------------------------------------------------------------ 19 Implementación */
const imp = [["Selección de imágenes", "El punto de partida para cerrar el sitio."], ["Sitio web", "Estructura y funcionalidad incluida, listas para recibir consultas."], ["Atención por WhatsApp", "Elegir entre Opción A y Opción B. Se puede empezar por la más simple."], ["Voz de Rincón", "En la Opción B, configurar tono, estilo y respuestas a medida."], ["Mejoras opcionales", "Se suman en el tiempo, según necesidad."]];
std("04 · Implementación", "Cómo avanzamos.", `
  <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:32px">
    ${imp.map(([t, x], i) => `<div class="item"><span class="num">${String(i + 1).padStart(2, "0")}</span><span class="lab" style="font-size:24px">${t}</span><p class="sm" style="color:#4E4847">${x}</p></div>`).join("")}
  </div>
  <div class="grid2" style="gap:72px;margin-top:20px">
    <div class="item"><span class="lab oc">Plazos</span><p class="lead">Los plazos se definen tras el relevamiento.</p><p class="sm">Los tiempos estimados de cada pieza figuran en su página.</p></div>
    <div class="item"><span class="lab oc">Forma de pago</span><p class="lead">50% para arrancar y 50% cuando el producto final está entregado y funcionando.</p><p class="sm">Aplica a ambas opciones de automatización de WhatsApp.</p></div>
  </div>`);

/* ------------------------------------------------------------ 20 Cierre */
raw(`<section class="page cover" style="background:#6B6463">
  <div style="position:absolute;inset:0;display:grid;place-items:center">
    <div style="display:grid;justify-items:center;gap:56px">
      <div style="width:210px"><img src="${A.rinconLight}" alt="Rincón de Pilar" style="width:100%;display:block"></div>
      <p style="font-size:26px;font-weight:300;color:#E4DEDA;letter-spacing:.02em">Sitio web y automatización de WhatsApp · Septiembre 2026</p>
    </div>
  </div>
  <div class="sealbox" style="background:#EBEBEB"><span>Una propuesta de</span><img src="${A.bravo}" alt="Bravo"></div>
</section>`);

const html = `<!doctype html><html lang="es"><head><meta charset="utf-8"><title>Propuesta comercial · Rincón de Pilar</title><style>${css}</style></head><body>${pages.join("\n")}</body></html>`;
writeFileSync(join(here, "deck.html"), html);
console.log("pages", pages.length);
