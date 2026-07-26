"use client";

import { useState } from "react";

const ACCESS_KEY = "PEGA_AQUI_TU_ACCESS_KEY";

const SERVICIOS = [
  "Baño de mascota",
  "Corte de pelo",
  "Corte de uñas",
  "Limpieza de oídos",
  "Deslanado",
];

const inputStyles =
  "w-full px-4 py-3 rounded-lg border border-neutral-300 bg-white " +
  "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent " +
  "transition-shadow";

type Status = "idle" | "sending" | "ok" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);
    const servicios = data.getAll("servicios").join(", ");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `Nueva solicitud de reserva — ${data.get("nombre")}`,
          from_name: "Olivia's Pet Spa",
          nombre: data.get("nombre"),
          direccion: data.get("direccion"),
          telefono: data.get("telefono"),
          servicios: servicios || "No especificado",
          requisitos: data.get("requisitos"),
          botcheck: data.get("botcheck"),
        }),
      });

      if (!res.ok) throw new Error("Request failed");

      form.reset();
      setStatus("ok");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen bg-background py-20 flex justify-center">
      <div className="max-w-3xl w-full px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-serif font-bold mb-4">Agenda tu cita</h1>
        <p className="text-neutral-600 text-lg mb-10">
          Cuéntanos qué necesita tu mascota y te contactamos para confirmar
          fecha y hora.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 sm:p-10 rounded-lg border border-neutral-200 shadow-sm space-y-6"
        >
          {/* Honeypot anti-spam — invisible para humanos */}
          <input
            type="checkbox"
            name="botcheck"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
          />

          <div>
            <label
              htmlFor="nombre"
              className="block text-sm font-semibold text-neutral-800 mb-2"
            >
              Nombre
            </label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              required
              autoComplete="name"
              placeholder="Tu nombre completo"
              className={inputStyles}
            />
          </div>

          <div>
            <label
              htmlFor="direccion"
              className="block text-sm font-semibold text-neutral-800 mb-2"
            >
              Dirección
            </label>
            <input
              id="direccion"
              name="direccion"
              type="text"
              required
              autoComplete="street-address"
              placeholder="Calle, número, ciudad"
              className={inputStyles}
            />
          </div>

          <div>
            <label
              htmlFor="telefono"
              className="block text-sm font-semibold text-neutral-800 mb-2"
            >
              Teléfono
            </label>
            <input
              id="telefono"
              name="telefono"
              type="tel"
              required
              autoComplete="tel"
              placeholder="+57 300 000 0000"
              className={inputStyles}
            />
          </div>

          <fieldset>
            <legend className="block text-sm font-semibold text-neutral-800 mb-3">
              Servicios que necesitas
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SERVICIOS.map((servicio) => (
                <label
                  key={servicio}
                  className="flex items-center gap-3 p-3 rounded-lg border border-neutral-200 hover:border-primary hover:bg-background cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    name="servicios"
                    value={servicio}
                    className="w-4 h-4 accent-primary"
                  />
                  <span className="text-neutral-700">{servicio}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div>
            <label
              htmlFor="requisitos"
              className="block text-sm font-semibold text-neutral-800 mb-2"
            >
              Cuéntanos más sobre tus requisitos:
            </label>
            <textarea
              id="requisitos"
              name="requisitos"
              rows={5}
              placeholder="Raza y tamaño de tu mascota, alergias, horarios preferidos..."
              className={`${inputStyles} resize-y`}
            />
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full sm:w-auto bg-accent hover:bg-accent-dark hover:text-white text-neutral-900 px-8 py-4 rounded-lg font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === "sending" ? "Enviando..." : "Enviar solicitud"}
          </button>

          {status === "ok" && (
            <p className="text-primary font-semibold" role="status">
              ¡Gracias! Recibimos tu solicitud y te contactaremos pronto. 🐾
            </p>
          )}

          {status === "error" && (
            <p className="text-red-600 font-semibold" role="alert">
              Hubo un problema al enviar. Intenta de nuevo o escríbenos
              directamente.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
