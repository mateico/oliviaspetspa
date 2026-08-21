const MARKDOWN = `# Olivia's Pet Spa — Pet Spa sobre ruedas

La experiencia de un spa para tu mascota, en la puerta de tu casa.

Baño, peluquería y cuidado profesional a domicilio en Maldonado.

- [Agendar un turno](/contact)
- [Ver nuestros servicios](/services)
`;

export function GET() {
  return new Response(MARKDOWN, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
