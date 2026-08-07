import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const DESTINATARIO = "mateo.rial@gmail.com";

// Sin dominio propio verificado en Resend hay que usar onboarding@resend.dev.
// Cuando verifiques el dominio: "Olivia's Pet Spa <reservas@tudominio.com>"
const REMITENTE = "Olivia's Pet Spa <onboarding@resend.dev>";

const OBLIGATORIOS = [
  "nombreDueno",
  "telefono",
  "direccion",
  "nombreMascota",
  "peso",
  "horario",
] as const;

// Los valores vienen del formulario público: hay que escaparlos antes de
// meterlos en el HTML del mail.
function esc(valor: unknown) {
  return String(valor ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function fila(etiqueta: string, valor: string) {
  return `
    <tr>
      <td style="padding:8px 12px;border-bottom:1px solid #eee;color:#666;font-size:14px;white-space:nowrap;vertical-align:top;">${esc(etiqueta)}</td>
      <td style="padding:8px 12px;border-bottom:1px solid #eee;color:#111;font-size:14px;">${esc(valor).replace(/\n/g, "<br>")}</td>
    </tr>`;
}

export async function POST(request: NextRequest) {
  try {
    const datos = await request.json();

    // Honeypot: si vino marcado es un bot. Respondemos ok y no mandamos nada.
    if (datos.botcheck) {
      return NextResponse.json({ success: true });
    }

    if (!process.env.RESEND_API_KEY) {
      console.error("Falta RESEND_API_KEY en las variables de entorno");
      return NextResponse.json(
        { error: "Servicio de envío no configurado" },
        { status: 500 },
      );
    }

    // Revalidamos en el servidor: el cliente puede saltearse la validación.
    const servicios: string[] = Array.isArray(datos.servicios)
      ? datos.servicios
      : [];
    const faltantes = OBLIGATORIOS.filter(
      (campo) => !String(datos[campo] ?? "").trim(),
    );

    if (faltantes.length > 0 || servicios.length === 0) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios", faltantes },
        { status: 400 },
      );
    }

    const html = `
      <div style="font-family:system-ui,-apple-system,sans-serif;max-width:600px;margin:0 auto;">
        <h2 style="font-size:20px;color:#111;margin-bottom:4px;">Nueva reserva</h2>
        <p style="color:#666;font-size:14px;margin-top:0;">
          ${esc(datos.nombreMascota)} — ${esc(datos.nombreDueno)}
        </p>

        <h3 style="font-size:14px;text-transform:uppercase;letter-spacing:.05em;color:#999;margin:24px 0 8px;">Propietario</h3>
        <table style="width:100%;border-collapse:collapse;">
          ${fila("Nombre", datos.nombreDueno)}
          ${fila("Teléfono", datos.telefono)}
          ${fila("Dirección", datos.direccion)}
        </table>

        <h3 style="font-size:14px;text-transform:uppercase;letter-spacing:.05em;color:#999;margin:24px 0 8px;">Mascota</h3>
        <table style="width:100%;border-collapse:collapse;">
          ${fila("Nombre", datos.nombreMascota)}
          ${fila("Peso", datos.peso)}
        </table>

        <h3 style="font-size:14px;text-transform:uppercase;letter-spacing:.05em;color:#999;margin:24px 0 8px;">Turno</h3>
        <table style="width:100%;border-collapse:collapse;">
          ${fila("Servicios", servicios.join("\n"))}
          ${fila(
            "Incluye",
            String(datos.detalleServicios ?? "—")
              .split(" | ")
              .join("\n"),
          )}
          ${fila("Horario", datos.horario)}
        </table>

        <h3 style="font-size:14px;text-transform:uppercase;letter-spacing:.05em;color:#999;margin:24px 0 8px;">Información adicional</h3>
        <table style="width:100%;border-collapse:collapse;">
          ${fila("Patología / necesidad especial", datos.patologia || "—")}
          ${fila("Otros comentarios", datos.comentarios || "—")}
        </table>
      </div>`;

    const texto = [
      `Nueva reserva — ${datos.nombreMascota} (${datos.nombreDueno})`,
      ``,
      `PROPIETARIO`,
      `Nombre: ${datos.nombreDueno}`,
      `Teléfono: ${datos.telefono}`,
      `Dirección: ${datos.direccion}`,
      ``,
      `MASCOTA`,
      `Nombre: ${datos.nombreMascota}`,
      `Peso: ${datos.peso}`,
      ``,
      `TURNO`,
      `Servicios: ${servicios.join(", ")}`,
      `Incluye: ${datos.detalleServicios ?? "—"}`,
      `Horario: ${datos.horario}`,
      ``,
      `INFORMACIÓN ADICIONAL`,
      `Patología / necesidad especial: ${datos.patologia || "—"}`,
      `Otros comentarios: ${datos.comentarios || "—"}`,
    ].join("\n");

    const { error } = await resend.emails.send({
      from: REMITENTE,
      to: DESTINATARIO,
      subject: `Nueva reserva — ${datos.nombreMascota} (${datos.nombreDueno})`,
      html,
      text: texto,
    });

    if (error) {
      console.error("Resend falló:", error);
      return NextResponse.json(
        { error: "No se pudo enviar la reserva" },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error al enviar la reserva:", error);
    return NextResponse.json({ error: "Envío fallido" }, { status: 500 });
  }
}
