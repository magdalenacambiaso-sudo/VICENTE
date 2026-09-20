# Fotografía temporal — moodboard, no assets finales

Las tres imágenes de esta carpeta (`hero-figure.jpg`, `about-structure.jpg`,
`manifesto-glass.jpg`) son referencias de dirección de arte adaptadas
temporalmente para poder ver el sistema "Bravo Square" funcionando con
fotografía real en vez de con placeholders de texto.

**No son fotografía licenciada para producción.** Son recortes/tratamientos
(desaturados a blanco y negro) de imágenes de referencia aportadas como
moodboard. Antes de cualquier lanzamiento real hay que reemplazarlas por
fotografía propia u original licenciada con la misma dirección:

- Editorial, humana, documental — nunca stock corporativo.
- Blanco y negro o muy desaturada.
- Presencia humana parcialmente oculta/obstruida (vidrio, distancia,
  desenfoque) — nunca caras sonriendo a cámara.

Cada imagen se usa dentro del componente `.reveal-window` (ver
`css/style.css`), que no depende técnicamente de estos archivos específicos:
alcanza con reemplazar el `src` de los `<img class="rw-blur">` /
`<img class="rw-clear">` en `index.html` por la foto definitiva, y ajustar
las variables `--wx` / `--wy` / `--ws` (posición y tamaño de la ventana de
claridad) si hace falta.

| Archivo | Usado en | Concepto |
|---|---|---|
| `hero-figure.jpg` | Hero | Una persona real, fotografiada a distancia — el cuadrado revela dónde mirar. |
| `about-structure.jpg` | Bravo / Sobre nosotros | Una estructura hecha a medida para dos personas. |
| `manifesto-glass.jpg` | Cómo trabajamos (corte fotográfico) | "Detrás de la tecnología hay personas." — dos siluetas a través de un vidrio esmerilado. |
