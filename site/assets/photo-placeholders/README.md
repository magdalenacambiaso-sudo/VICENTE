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
| `hero-glass.jpg` | Hero (foto a pantalla completa) | Personas detrás de una superficie translúcida — la tecnología está a la vista, las personas detrás. |
| `manifesto-glass.jpg` | La frase humana | "La transformación es digital. El criterio sigue siendo humano." |
| `about-structure.jpg` | Bravo / Sobre nosotros | Una estructura hecha a medida para dos personas. |
