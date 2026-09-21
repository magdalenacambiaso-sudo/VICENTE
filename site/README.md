# Bravo — Apertura de homepage

Prototipo de la apertura de la homepage de Bravo: un único scroll continuo
compuesto por tres momentos (Identidad → Complejidad → Método), construido
siguiendo el `Manual de Marca` de Bravo como fuente de verdad.

Abrir `index.html` en el navegador (o servir la carpeta con cualquier
servidor estático) para recorrer la secuencia completa.

## Alcance de esta entrega

Solo la apertura (los tres momentos y sus transiciones). Las secciones
internas del sitio (Qué hacemos, Servicios, Bravo, Contacto, etc.) quedan
fuera de esta instancia — el documento termina en un stub que marca dónde
empezaría el contenido principal.

## Decisiones técnicas

- HTML/CSS/JS plano, sin dependencias ni build step.
- La secuencia se resuelve con un único `.stage` en `position: sticky`
  dentro de un contenedor `.opening` de altura extendida (`380vh`). El
  scroll dentro de ese contenedor se traduce en un progreso `0–1`
  (`script.js`) que controla opacidad, traslación y escala de cada momento,
  con solapamiento breve entre ellos para lograr disolución en vez de corte.
- Tipografía, color y reglas de composición (aire, poco bold, azul como
  firma, full screen ≠ zoom) tomadas directamente del manual.

## Placeholder de fotografía

El manual pide fotografía real (editorial, documental, humana) para el
hero — "personas detrás de una superficie translúcida". No se dispone
todavía de material fotográfico propio de Bravo, así que `hero-photo` en
`index.html`/`style.css` es una escena generada en CSS (vidrio + siluetas
desenfocadas) que respeta el encuadre, el aire y la profundidad de la
Referencia 01, pero es un sustituto estructural, no la pieza final. Al
tener fotografía real, reemplazar ese bloque por una imagen/video de fondo
manteniendo la jerarquía y el crop amplio (full screen ≠ zoom).

## Pendiente / próximos ajustes

- Ajuste fino del diagrama de "Método" en mobile (el layout alternado
  arriba/abajo de los 4 pasos funciona pero se puede apretar más).
- Sumar `prefers-reduced-motion` más granular si se detecta necesidad real.
- Reemplazar el placeholder fotográfico del hero por material real.
