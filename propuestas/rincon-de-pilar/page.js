(function(){
  "use strict";
  var LINK_BASE = "__LINK_BASE__";
  var deck = document.getElementById("deck");
  var FR = Array.prototype.slice.call(deck.querySelectorAll(":scope > .frame"));
  var N = FR.length - 1;
  var cur = 0;
  var pad = function(n){ return (n < 10 ? "0" : "") + n; };
  var $ = function(id){ return document.getElementById(id); };

  /* ---------- overrides (text + images saved by edit mode) ---------- */
  var OV = {t:{}, i:{}};
  try { var raw = JSON.parse($("ov").textContent || "{}"); OV.t = raw.t || {}; OV.i = raw.i || {}; } catch(e){}

  var EDSEL = "h1,h2,h3,h4,p,li,dt,dd,.lbl,.cap,.v,.k,.n,.t,.x,.i,.ap,.who,.bub,.legend,.sub,.mono,.url,.links,.ev,.dt,figcaption,span.e";
  var ORIG_T = {}, ORIG_I = {};
  FR.forEach(function(f){
    var all = Array.prototype.slice.call(f.querySelectorAll(EDSEL)).filter(function(el){
      return !el.closest("svg") && !el.closest(".imgtools");
    });
    var leaf = all.filter(function(el){ return !all.some(function(o){ return o !== el && el.contains(o); }); });
    leaf.forEach(function(el, n){ var k = f.id + "." + n; el.setAttribute("data-k", k); ORIG_T[k] = el.innerHTML; });
    f.querySelectorAll("[data-img]").forEach(function(box){ ORIG_I[box.getAttribute("data-img")] = box.innerHTML; });
  });
  function applyOverrides(){
    Object.keys(OV.t).forEach(function(k){
      var el = deck.querySelector('[data-k="' + k + '"]'); if (el) el.innerHTML = OV.t[k];
    });
    Object.keys(ORIG_I).forEach(function(k){
      var box = deck.querySelector('[data-img="' + k + '"]'); if (!box) return;
      if (OV.i[k]) box.innerHTML = '<img class="ph" alt="" src="' + OV.i[k] + '">';
      else box.innerHTML = ORIG_I[k];
      box.classList.toggle("none", k === "logo" && !OV.i[k]);
    });
  }
  applyOverrides();

  /* ---------- navigation ---------- */
  $("tot").textContent = pad(N);
  var sel = $("sel");
  FR.forEach(function(f, i){
    var b = document.createElement("button");
    b.type = "button";
    b.setAttribute("aria-label", pad(i) + " " + f.getAttribute("data-title"));
    b.innerHTML = "<span>" + pad(i) + "</span>";
    b.addEventListener("click", function(){ go(i); });
    sel.appendChild(b);
  });
  function setHash(id){
    try { history.replaceState(null, "", "#" + id); } catch(e){ try { location.hash = id; } catch(e2){} }
  }
  function go(i, fromHash){
    i = Math.max(0, Math.min(N, i));
    if (i !== cur){ FR[cur].classList.remove("on"); FR[cur].setAttribute("aria-hidden", "true"); }
    cur = i;
    var f = FR[i];
    f.classList.add("on"); f.removeAttribute("aria-hidden"); f.scrollTop = 0;
    document.body.classList.toggle("tone-dark", f.classList.contains("dark"));
    try { document.body.style.setProperty("--cbg", getComputedStyle(f).backgroundColor); } catch(e){}
    $("cur").textContent = pad(i);
    $("prev").disabled = i === 0; $("next").disabled = i === N;
    Array.prototype.forEach.call(sel.children, function(b, j){ b.classList.toggle("cur", j === i); });
    Array.prototype.forEach.call(document.querySelectorAll("#il .it"), function(b, j){ b.classList.toggle("cur", j === i); });
    if (!fromHash) setHash(f.id);
  }
  FR.forEach(function(f, i){ if (i !== 0) f.setAttribute("aria-hidden", "true"); });
  function fromHash(){
    var h = (location.hash || "").replace("#", "");
    var i = FR.findIndex(function(f){ return f.id === h; });
    if (i >= 0) go(i, true);
  }
  window.addEventListener("hashchange", fromHash);
  $("prev").addEventListener("click", function(){ go(cur - 1); });
  $("next").addEventListener("click", function(){ go(cur + 1); });
  deck.addEventListener("click", function(e){
    var t = e.target.closest("[data-go]");
    if (t && !document.body.classList.contains("editing")){ e.preventDefault(); go(+t.getAttribute("data-go")); }
  });
  document.addEventListener("keydown", function(e){
    if (e.target.isContentEditable || /INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    var k = e.key;
    if (k === "ArrowRight" || k === "PageDown"){ e.preventDefault(); go(cur + 1); }
    else if (k === "ArrowLeft" || k === "PageUp"){ e.preventDefault(); go(cur - 1); }
    else if (k === "Home"){ go(0); } else if (k === "End"){ go(N); }
    else if (k === "Escape"){ closeIdx(); }
  });
  var tx = null, ty = 0;
  deck.addEventListener("touchstart", function(e){ if (e.touches.length === 1){ tx = e.touches[0].clientX; ty = e.touches[0].clientY; } }, {passive:true});
  deck.addEventListener("touchend", function(e){
    if (tx === null || document.body.classList.contains("editing")) return;
    var dx = e.changedTouches[0].clientX - tx, dy = e.changedTouches[0].clientY - ty; tx = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.4) go(cur + (dx < 0 ? 1 : -1));
  }, {passive:true});
  var wheelLock = 0;
  deck.addEventListener("wheel", function(e){
    if (Math.abs(e.deltaX) > 40 && Math.abs(e.deltaX) > Math.abs(e.deltaY) * 2 && Date.now() > wheelLock){
      wheelLock = Date.now() + 900; go(cur + (e.deltaX > 0 ? 1 : -1));
    }
  }, {passive:true});

  /* ---------- toast + links ---------- */
  var tt;
  function toast(msg){ var t = $("toast"); t.textContent = msg; t.classList.add("show"); clearTimeout(tt); tt = setTimeout(function(){ t.classList.remove("show"); }, 2200); }
  function linkFor(i){
    var base = (window.claude && LINK_BASE.indexOf("__") !== 0) ? LINK_BASE : location.href.split("#")[0];
    return base + "#" + FR[i].id;
  }
  function copyLink(i){
    var url = linkFor(i);
    try {
      navigator.clipboard.writeText(url).then(function(){ toast("Enlace copiado · " + pad(i)); }, function(){ toast(url); });
    } catch(e){ toast(url); }
  }
  $("copyCur").addEventListener("click", function(){ copyLink(cur); });

  /* ---------- index with thumbnails ---------- */
  var il = $("il");
  function buildIndex(){
    il.innerHTML = "";
    FR.forEach(function(f, i){
      var wrap = document.createElement("div");
      wrap.className = "it" + (i === cur ? " cur" : "");
      var b = document.createElement("button"); b.type = "button"; b.className = "it-b";
      b.style.cssText = "display:grid;gap:8px;text-align:left;width:100%";
      var th = document.createElement("div"); th.className = "th";
      var c = f.cloneNode(true);
      c.removeAttribute("id"); c.classList.add("on"); c.removeAttribute("aria-hidden"); c.setAttribute("inert", "");
      c.querySelectorAll("[id]").forEach(function(n){ n.removeAttribute("id"); });
      c.querySelectorAll("[contenteditable]").forEach(function(n){ n.removeAttribute("contenteditable"); });
      c.querySelectorAll(".imgtools").forEach(function(n){ n.remove(); });
      th.appendChild(c);
      var row = document.createElement("div"); row.className = "row";
      row.innerHTML = '<span class="t"></span><span class="n">' + pad(i) + " / " + pad(N) + "</span>";
      row.querySelector(".t").textContent = f.getAttribute("data-title");
      b.appendChild(th); b.appendChild(row);
      b.addEventListener("click", function(){ go(i); closeIdx(); });
      var cl = document.createElement("button"); cl.type = "button"; cl.className = "copyl"; cl.textContent = "Copiar enlace a esta pantalla";
      cl.style.justifySelf = "start";
      cl.addEventListener("click", function(){ copyLink(i); });
      wrap.appendChild(b); wrap.appendChild(cl);
      il.appendChild(wrap);
    });
    scaleThumbs();
  }
  function scaleThumbs(){
    il.querySelectorAll(".th").forEach(function(th){
      var s = th.clientWidth / 1280; var fr = th.firstChild; if (fr) fr.style.transform = "scale(" + s + ")";
    });
  }
  var built = false;
  function openIdx(){
    if (!built || dirtyThumbs){ buildIndex(); built = true; dirtyThumbs = false; }
    $("idx").classList.add("open"); $("scrim").classList.add("open"); $("idx").removeAttribute("inert");
    requestAnimationFrame(scaleThumbs);
    var c = il.children[cur]; if (c) c.scrollIntoView({block:"center"});
  }
  function closeIdx(){ $("idx").classList.remove("open"); $("scrim").classList.remove("open"); $("idx").setAttribute("inert", ""); }
  var dirtyThumbs = false;
  $("idxBtn").addEventListener("click", openIdx);
  $("idxClose").addEventListener("click", closeIdx);
  $("scrim").addEventListener("click", closeIdx);
  window.addEventListener("resize", scaleThumbs);

  fromHash();
  go(cur, true);

  /* ---------- edit mode (owner only) ---------- */
  var artifactNS = null, editing = false, pendingI = {};
  var editBtn = $("editBtn"), bar = $("editbar"), stEl = $("editst");
  function start(){
    if (!window.claude || typeof window.claude.use !== "function") return;
    window.claude.use("user").then(function(user){
      var owner = false;
      try { owner = !!(user && user.isOwner()); } catch(e){}
      if (!owner) return;
      return window.claude.use("artifact").then(function(a){
        if (!a) return;
        artifactNS = a; editBtn.hidden = false;
      });
    }).catch(function(){});
  }
  start();

  function imgTools(on){
    deck.querySelectorAll("[data-img]").forEach(function(box){
      var old = box.parentNode.querySelector(':scope > .imgtools[data-for="' + box.getAttribute("data-img") + '"]');
      if (old) old.remove();
      if (!on) return;
      var k = box.getAttribute("data-img");
      var t = document.createElement("div"); t.className = "imgtools"; t.setAttribute("data-for", k);
      t.innerHTML = '<button type="button" data-a="r">Reemplazar imagen</button><button type="button" data-a="x">Restaurar</button>';
      t.querySelector('[data-a="r"]').addEventListener("click", function(){ pickImage(k); });
      t.querySelector('[data-a="x"]').addEventListener("click", function(){ pendingI[k] = null; setImg(k, null); });
      if (getComputedStyle(box.parentNode).position === "static") box.parentNode.style.position = "relative";
      box.parentNode.appendChild(t);
    });
  }
  function setImg(k, src){
    var box = deck.querySelector('[data-img="' + k + '"]'); if (!box) return;
    box.innerHTML = src ? '<img class="ph" alt="" src="' + src + '">' : ORIG_I[k];
    box.classList.toggle("none", k === "logo" && !src);
  }
  function pickImage(k){
    var inp = document.createElement("input"); inp.type = "file"; inp.accept = "image/*";
    inp.addEventListener("change", function(){
      var file = inp.files && inp.files[0]; if (!file) return;
      stEl.textContent = "Procesando imagen…";
      var keepPng = /png|svg/.test(file.type);
      var r = new FileReader();
      r.onload = function(){
        var img = new Image();
        img.onload = function(){
          var max = k === "logo" ? 900 : 2000;
          var s = Math.min(1, max / Math.max(img.width, img.height));
          var c = document.createElement("canvas"); c.width = Math.round(img.width * s); c.height = Math.round(img.height * s);
          c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
          var url = keepPng ? c.toDataURL("image/png") : c.toDataURL("image/jpeg", 0.84);
          pendingI[k] = url; setImg(k, url); stEl.textContent = "Imagen lista. Guardá para publicarla.";
        };
        img.onerror = function(){ stEl.textContent = "No se pudo leer esa imagen. Probá con JPG o PNG."; };
        img.src = r.result;
      };
      r.readAsDataURL(file);
    });
    inp.click();
  }
  function enterEdit(){
    editing = true; pendingI = {}; closeIdx();
    document.body.classList.add("editing");
    deck.querySelectorAll("[data-k]").forEach(function(el){ el.setAttribute("contenteditable", "true"); el.spellcheck = true; });
    imgTools(true); bar.hidden = false; editBtn.hidden = true;
    stEl.textContent = "Tocá cualquier texto para editarlo.";
  }
  function exitEdit(){
    editing = false; document.body.classList.remove("editing");
    deck.querySelectorAll("[contenteditable]").forEach(function(el){ el.removeAttribute("contenteditable"); });
    imgTools(false); bar.hidden = true; editBtn.hidden = false; dirtyThumbs = true;
  }
  deck.addEventListener("paste", function(e){
    if (!e.target.closest || !e.target.closest("[contenteditable]")) return;
    e.preventDefault();
    var text = (e.clipboardData || window.clipboardData).getData("text/plain");
    document.execCommand("insertText", false, text);
  });
  deck.addEventListener("keydown", function(e){
    if (e.key === "Enter" && e.target.isContentEditable && !e.shiftKey){ e.preventDefault(); document.execCommand("insertLineBreak"); }
  });
  function collect(){
    var t = {}, i = {};
    deck.querySelectorAll("[data-k]").forEach(function(el){
      var k = el.getAttribute("data-k"); var h = el.innerHTML;
      if (h !== ORIG_T[k]) t[k] = h;
    });
    Object.keys(OV.i).forEach(function(k){ i[k] = OV.i[k]; });
    Object.keys(pendingI).forEach(function(k){ if (pendingI[k]) i[k] = pendingI[k]; else delete i[k]; });
    return {t:t, i:i};
  }
  function b64decode(s){
    var bin = atob(s); var u = new Uint8Array(bin.length);
    for (var j = 0; j < bin.length; j++) u[j] = bin.charCodeAt(j);
    return new TextDecoder().decode(u);
  }
  var RESET = ":root{color-scheme:light;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0;font:14px/1.4 system-ui,sans-serif;background:#fafaf9}img{max-width:100%}[hidden]{display:none!important}";
  function buildDoc(ov){
    var b64 = $("__src").textContent.trim();
    var src = b64decode(b64);
    var close = "</scr" + "ipt>";
    var mark = '<script type="application/json" id="ov">{}' + close;
    var json = JSON.stringify(ov).replace(/</g, "\\u003c");
    var body = src.replace(mark, '<script type="application/json" id="ov">' + json + close);
    return '<!doctype html><html><head><meta charset=utf8><meta name=viewport content="width=device-width,initial-scale=1,viewport-fit=cover"><style>' + RESET + "</style></head><body>" +
      body + '<script type="text/x-b64" id="__src">' + b64 + close + "</body></html>";
  }
  function save(){
    if (!artifactNS) return;
    var ov = collect();
    stEl.textContent = "Guardando…";
    $("saveBtn").disabled = true;
    var html;
    try { html = buildDoc(ov); } catch(e){ stEl.textContent = "No se pudo preparar la página."; $("saveBtn").disabled = false; return; }
    artifactNS.publish(html).then(function(){
      stEl.textContent = "Guardado. La página se actualiza.";
    }, function(err){
      $("saveBtn").disabled = false;
      var c = err && err.code;
      if (c === "conflict") stEl.textContent = "Había una versión más nueva; se carga esa.";
      else if (c === "not_writer" || c === "not_granted" || c === "consent_required" || c === "capability_disabled"){ stEl.textContent = "Esta vista no puede guardar cambios."; }
      else if (c === "too_large") stEl.textContent = "La página quedó muy pesada. Usá imágenes más livianas.";
      else if (c === "rate_limited") stEl.textContent = "Demasiados guardados seguidos. Esperá un momento.";
      else stEl.textContent = "No se pudo guardar. Probá de nuevo en unos segundos.";
    });
  }
  editBtn.addEventListener("click", enterEdit);
  $("saveBtn").addEventListener("click", save);
  $("cancelBtn").addEventListener("click", function(){
    deck.querySelectorAll("[data-k]").forEach(function(el){
      var k = el.getAttribute("data-k"); el.innerHTML = OV.t[k] != null ? OV.t[k] : ORIG_T[k];
    });
    Object.keys(ORIG_I).forEach(function(k){ setImg(k, OV.i[k] || null); });
    exitEdit();
  });
})();
