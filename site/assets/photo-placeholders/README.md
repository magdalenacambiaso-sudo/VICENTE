# Fotografía temporal — moodboard, no assets finales

Las imágenes de esta carpeta son referencias de dirección de arte, recortadas
y tratadas a partir de moodboard aportado, para poder ver la web funcionando
con fotografía real en vez de con placeholders de texto.

**No son fotografía licenciada para producción.** Antes de cualquier
lanzamiento real hay que reemplazarlas por fotografía propia u original
licenciada con la misma dirección:

- Editorial, humana, documental, contemporánea — nunca stock corporativo.
- Puede conservar tonos naturales y desaturados (verdes grisáceos, azules
  humo, blancos cálidos, grises piedra) o ser blanco y negro en las piezas
  más conceptuales — nunca un color saturado que compita con el Bravo Blue.
- Presencia humana parcialmente oculta/obstruida (vidrio, distancia,
  desenfoque) — nunca caras sonriendo a cámara.

Cada foto se muestra con el componente `.plain-photo` (ver `css/style.css`):
una imagen simple con un desplazamiento de escala muy lento (`photo-drift`),
sin máscaras ni interacción. Reemplazar es tan simple como cambiar el `src`
del `<img>` correspondiente en `index.html` — nada depende técnicamente de
estos archivos puntuales.

| Archivo | Usado en | Concepto |
|---|---|---|
| `hero-glass.jpg` | Hero (foto a pantalla completa) | Una escena amplia detrás de una superficie translúcida — mesa, sillas, varias siluetas, mucho aire — no un retrato cerrado de una sola persona. |
| `manifesto-glass.jpg` | La frase humana | "La transformación es digital. El criterio sigue siendo humano." |
| `about-structure.jpg` | Bravo / Sobre nosotros | Una estructura hecha a medida para dos personas. |

`hero-glass.jpg` está recortado con encuadre abierto a propósito: el objetivo
es que se lea como una escena (mesa, sillas, arquitectura, varias personas),
no como un primer plano ampliado de una sola figura. Al usarse con
`object-fit: cover` a pantalla completa, un recorte casi cuadrado o muy
ajustado termina agrandando artificialmente a las personas — por eso el
archivo actual conserva una relación de aspecto cercana a la del viewport.
