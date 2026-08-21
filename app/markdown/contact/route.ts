const MARKDOWN = `# Reserva tu turno

Completá el formulario en https://www.oliviaspetspa.com/contact y te contactamos para confirmar fecha y hora.

## Reservar mediante un agente

Este sitio expone el mismo formulario como un endpoint HTTP público: \`POST /api/reserva\`. Ver la skill "book-appointment" en /.well-known/agent-skills/index.json para el formato exacto de campos requeridos y opcionales.

## Datos que se piden

- Nombre del dueño
- Teléfono
- Dirección
- Nombre de la mascota
- Peso de la mascota (0–10 kg, 10–20 kg, 20–30 kg, más de 30 kg)
- Servicio(s) deseado(s) — ver /services para el listado y precios
- Horario preferido (mañana, tarde, u horario específico)
- Patología o necesidad especial (opcional)
- Otros comentarios (opcional)

Enviar la reserva no la confirma automáticamente: el equipo revisa la solicitud y confirma disponibilidad directamente con el dueño.
`;

export function GET() {
  return new Response(MARKDOWN, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
