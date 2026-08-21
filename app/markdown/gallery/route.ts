const MARKDOWN = `# Galería de trabajos realizados

Descubre nuestra calidad en cada corte, cada baño y cada mascota feliz que sale de nuestro spa móvil.

Esta página es principalmente visual (fotos de mascotas antes y después de sus servicios de aseo). Las imágenes no están incluidas en esta versión en markdown — visita https://www.oliviaspetspa.com/gallery para verlas.

[Agendar ahora](/contact)
`;

export function GET() {
  return new Response(MARKDOWN, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
