"use client";

import { useState } from "react";

// Registrá mateo.rial@gmail.com en web3forms.com y pegá acá la access key.
// El mail de destino queda atado a esa key.
const ACCESS_KEY = "PEGA_AQUI_TU_ACCESS_KEY";

const PESOS = ["0–10 kg", "10–20 kg", "20–30 kg", "Más de 30 kg"];

const SERVICIOS: { nombre: string; incluye: string[] }[] = [
  {
    nombre: "Baño pelo corto",
    incluye: [
      "Baño",
      "Secado",
      "Corte de uñas",
      "Limpieza de oídos",
      "Perfume",
    ],
  },
  {
    nombre: "Baño pelo largo",
    incluye: [
      "Baño",
      "Desenredado",
      "Cepillado profundo",
      "Secado",
      "Corte higiénico",
      "Corte de uñas",
      "Limpieza de oídos",
      "Perfume",
    ],
  },
  {
    nombre: "Deslanado",
    incluye: [
      "Retiro de pelo muerto",
      "Baño",
      "Secado",
      "Corte de uñas",
      "Limpieza de oídos",
      "Perfume",
    ],
  },
  {
    nombre: "Servicio completo",
    incluye: [
      "Corte a elección",
      "Baño",
      "Secado",
      "Corte de uñas",
      "Limpieza de oídos",
      "Perfume",
    ],
  },
  {
    nombre: "Servicio de mantenimiento para pelo largo",
    incluye: [
      "Baño",
      "Secado",
      "Cepillado profundo",
      "Desenredado",
      "Recorte de mantenimiento",
      "Corte de uñas",
      "Limpieza de oídos",
      "Perfume",
    ],
  },
  { nombre: "Limpieza de glándulas anales", incluye: [] },
];

const HORARIOS = ["Mañana", "Tarde", "Horario específico"];

const VALORES_INICIALES = {
  nombreDueno: "",
  telefono: "",
  direccion: "",
  nombreMascota: "",
  peso: "",
  horario: "",
  horarioDetalle: "",
  patologia: "",
  comentarios: "",
};

type Valores = typeof VALORES_INICIALES;
type CampoError = keyof Valores | "servicios";
type Errores = Partial<Record<CampoError, string>>;
type Status = "idle" | "sending" | "ok" | "error";

// Nombre legible de cada campo, para el resumen de errores.
const ETIQUETAS: Record<string, string> = {
  nombreDueno: "Nombre del dueño",
  telefono: "Teléfono",
  direccion: "Dirección",
  nombreMascota: "Nombre de la mascota",
  peso: "Peso de la mascota",
  servicios: "Servicios",
  horario: "Horario preferido",
  horarioDetalle: "Horario específico",
};

function validar(v: Valores, servicios: string[]): Errores {
  const e: Errores = {};
  if (!v.nombreDueno.trim()) e.nombreDueno = "Ingresá el nombre del dueño.";
  if (!v.telefono.trim()) e.telefono = "Ingresá un teléfono de contacto.";
  if (!v.direccion.trim()) e.direccion = "Ingresá la dirección.";
  if (!v.nombreMascota.trim())
    e.nombreMascota = "Ingresá el nombre de la mascota.";
  if (!v.peso) e.peso = "Seleccioná el peso de la mascota.";
  if (servicios.length === 0) e.servicios = "Seleccioná al menos un servicio.";
  if (!v.horario) e.horario = "Seleccioná un horario preferido.";
  if (v.horario === "Horario específico" && !v.horarioDetalle.trim())
    e.horarioDetalle = "Escribí el horario que preferís.";
  return e;
}

const inputStyles =
  "w-full px-4 py-3 rounded-lg border border-neutral-300 bg-white " +
  "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent " +
  "transition-shadow";

const inputError = "border-red-500 focus:ring-red-500";

const seccionStyles = "text-2xl font-serif font-bold text-neutral-900";

export default function Contact() {
  const [valores, setValores] = useState<Valores>(VALORES_INICIALES);
  const [servicios, setServicios] = useState<string[]>([]);
  const [errores, setErrores] = useState<Errores>({});
  const [infoAbierta, setInfoAbierta] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");

  function setCampo(campo: keyof Valores, valor: string) {
    setValores((prev) => ({ ...prev, [campo]: valor }));
    setErrores((prev) => {
      if (!prev[campo]) return prev;
      const resto = { ...prev };
      delete resto[campo];
      return resto;
    });
  }

  function toggleServicio(nombre: string) {
    setServicios((prev) =>
      prev.includes(nombre)
        ? prev.filter((s) => s !== nombre)
        : [...prev, nombre],
    );
    setErrores((prev) => {
      if (!prev.servicios) return prev;
      const resto = { ...prev };
      delete resto.servicios;
      return resto;
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    const nuevosErrores = validar(valores, servicios);
    setErrores(nuevosErrores);

    const faltantes = Object.keys(nuevosErrores);
    if (faltantes.length > 0) {
      setStatus("idle");
      document.getElementById(`campo-${faltantes[0]}`)?.focus();
      return;
    }

    setStatus("sending");

    const detalleServicios = SERVICIOS.filter((s) =>
      servicios.includes(s.nombre),
    )
      .map((s) =>
        s.incluye.length > 0
          ? `${s.nombre} (incluye: ${s.incluye.join(", ")})`
          : s.nombre,
      )
      .join(" | ");

    const horario =
      valores.horario === "Horario específico"
        ? `Horario específico: ${valores.horarioDetalle}`
        : valores.horario;

    try {
      const res = await fetch("/api/reserva", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombreDueno: valores.nombreDueno,
          telefono: valores.telefono,
          direccion: valores.direccion,
          nombreMascota: valores.nombreMascota,
          peso: valores.peso,
          servicios,
          detalleServicios,
          horario,
          patologia: valores.patologia,
          comentarios: valores.comentarios,
          botcheck: new FormData(form).get("botcheck"),
        }),
      });

      if (!res.ok) throw new Error("Request failed");

      form.reset();
      setValores(VALORES_INICIALES);
      setServicios([]);
      setInfoAbierta(null);
      setStatus("ok");
    } catch {
      setStatus("error");
    }
  }

  const listaFaltantes = Object.keys(errores);

  return (
    <div className="min-h-screen bg-background py-20 flex justify-center">
      <div className="max-w-3xl w-full px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-serif font-bold mb-4">Reserva tu turno</h1>
        <p className="text-neutral-600 text-lg mb-10">
          Completá el formulario y te contactamos para confirmar fecha y hora.
          Los campos marcados con{" "}
          <span className="text-red-600 font-semibold">*</span> son
          obligatorios.
        </p>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="bg-white p-6 sm:p-10 rounded-lg border border-neutral-200 shadow-sm space-y-10"
        >
          {/* Honeypot anti-spam — invisible para humanos */}
          <input
            type="checkbox"
            name="botcheck"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
          />

          {/* ── Datos del propietario ───────────────────────────── */}
          <section className="space-y-6">
            <h2 className={seccionStyles}>Datos del propietario</h2>

            <div>
              <label
                htmlFor="campo-nombreDueno"
                className="block text-sm font-semibold text-neutral-800 mb-2"
              >
                Nombre del dueño <span className="text-red-600">*</span>
              </label>
              <input
                id="campo-nombreDueno"
                type="text"
                autoComplete="name"
                placeholder="Nombre y apellido"
                value={valores.nombreDueno}
                onChange={(e) => setCampo("nombreDueno", e.target.value)}
                aria-invalid={!!errores.nombreDueno}
                className={`${inputStyles} ${errores.nombreDueno ? inputError : ""}`}
              />
              {errores.nombreDueno && (
                <p className="mt-2 text-sm text-red-600">
                  {errores.nombreDueno}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="campo-telefono"
                className="block text-sm font-semibold text-neutral-800 mb-2"
              >
                Teléfono <span className="text-red-600">*</span>
              </label>
              <input
                id="campo-telefono"
                type="tel"
                autoComplete="tel"
                placeholder="099 123 456"
                value={valores.telefono}
                onChange={(e) => setCampo("telefono", e.target.value)}
                aria-invalid={!!errores.telefono}
                className={`${inputStyles} ${errores.telefono ? inputError : ""}`}
              />
              {errores.telefono && (
                <p className="mt-2 text-sm text-red-600">{errores.telefono}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="campo-direccion"
                className="block text-sm font-semibold text-neutral-800 mb-2"
              >
                Dirección <span className="text-red-600">*</span>
              </label>
              <input
                id="campo-direccion"
                type="text"
                autoComplete="street-address"
                placeholder="Calle, número, ciudad"
                value={valores.direccion}
                onChange={(e) => setCampo("direccion", e.target.value)}
                aria-invalid={!!errores.direccion}
                className={`${inputStyles} ${errores.direccion ? inputError : ""}`}
              />
              {errores.direccion && (
                <p className="mt-2 text-sm text-red-600">{errores.direccion}</p>
              )}
            </div>
          </section>

          {/* ── Datos de la mascota ─────────────────────────────── */}
          <section className="space-y-6">
            <h2 className={seccionStyles}>Datos de la mascota</h2>

            <div>
              <label
                htmlFor="campo-nombreMascota"
                className="block text-sm font-semibold text-neutral-800 mb-2"
              >
                Nombre de la mascota <span className="text-red-600">*</span>
              </label>
              <input
                id="campo-nombreMascota"
                type="text"
                placeholder="Ej.: Olivia"
                value={valores.nombreMascota}
                onChange={(e) => setCampo("nombreMascota", e.target.value)}
                aria-invalid={!!errores.nombreMascota}
                className={`${inputStyles} ${errores.nombreMascota ? inputError : ""}`}
              />
              {errores.nombreMascota && (
                <p className="mt-2 text-sm text-red-600">
                  {errores.nombreMascota}
                </p>
              )}
            </div>

            <fieldset>
              <legend className="block text-sm font-semibold text-neutral-800 mb-3">
                Peso de la mascota <span className="text-red-600">*</span>
              </legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PESOS.map((peso, i) => (
                  <label
                    key={peso}
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors hover:border-primary hover:bg-background ${
                      valores.peso === peso
                        ? "border-primary bg-background"
                        : "border-neutral-200"
                    }`}
                  >
                    <input
                      id={i === 0 ? "campo-peso" : undefined}
                      type="radio"
                      name="peso"
                      value={peso}
                      checked={valores.peso === peso}
                      onChange={(e) => setCampo("peso", e.target.value)}
                      className="w-4 h-4 accent-primary"
                    />
                    <span className="text-neutral-700">{peso}</span>
                  </label>
                ))}
              </div>
              {errores.peso && (
                <p className="mt-2 text-sm text-red-600">{errores.peso}</p>
              )}
            </fieldset>
          </section>

          {/* ── Servicios ───────────────────────────────────────── */}
          <section className="space-y-6">
            <div>
              <h2 className={seccionStyles}>Selecciona los servicios</h2>
              <p className="text-sm text-neutral-500 mt-1">
                Podés elegir más de uno.
              </p>
            </div>

            <fieldset>
              <legend className="sr-only">
                Servicios que necesitás (obligatorio)
              </legend>
              <div className="space-y-3">
                {SERVICIOS.map((servicio, i) => {
                  const abierto = infoAbierta === servicio.nombre;
                  const elegido = servicios.includes(servicio.nombre);
                  return (
                    <div
                      key={servicio.nombre}
                      className={`rounded-lg border transition-colors ${
                        elegido
                          ? "border-primary bg-background"
                          : "border-neutral-200 hover:border-primary"
                      }`}
                    >
                      <div className="flex items-center gap-3 p-3">
                        <label className="flex items-center gap-3 flex-1 cursor-pointer">
                          <input
                            id={i === 0 ? "campo-servicios" : undefined}
                            type="checkbox"
                            name="servicios"
                            value={servicio.nombre}
                            checked={elegido}
                            onChange={() => toggleServicio(servicio.nombre)}
                            className="w-4 h-4 accent-primary shrink-0"
                          />
                          <span className="text-neutral-700">
                            {servicio.nombre}
                          </span>
                        </label>

                        {servicio.incluye.length > 0 && (
                          <button
                            type="button"
                            onClick={() =>
                              setInfoAbierta(abierto ? null : servicio.nombre)
                            }
                            aria-expanded={abierto}
                            aria-controls={`incluye-${i}`}
                            className="shrink-0 text-sm text-primary font-semibold px-2 py-1 rounded hover:bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                          >
                            ⓘ <span className="hidden sm:inline">Más </span>
                            información
                          </button>
                        )}
                      </div>

                      {abierto && (
                        <div
                          id={`incluye-${i}`}
                          className="px-4 pb-4 pl-10 border-t border-neutral-100 pt-3"
                        >
                          <p className="text-sm font-semibold text-neutral-800 mb-1">
                            Incluye:
                          </p>
                          <ul className="text-sm text-neutral-600 list-disc list-inside space-y-1">
                            {servicio.incluye.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              {errores.servicios && (
                <p className="mt-2 text-sm text-red-600">{errores.servicios}</p>
              )}
            </fieldset>
          </section>

          {/* ── Horario ─────────────────────────────────────────── */}
          <section className="space-y-6">
            <h2 className={seccionStyles}>Horario preferido</h2>

            <fieldset>
              <legend className="sr-only">
                Horario preferido (obligatorio)
              </legend>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {HORARIOS.map((horario, i) => (
                  <label
                    key={horario}
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors hover:border-primary hover:bg-background ${
                      valores.horario === horario
                        ? "border-primary bg-background"
                        : "border-neutral-200"
                    }`}
                  >
                    <input
                      id={i === 0 ? "campo-horario" : undefined}
                      type="radio"
                      name="horario"
                      value={horario}
                      checked={valores.horario === horario}
                      onChange={(e) => setCampo("horario", e.target.value)}
                      className="w-4 h-4 accent-primary"
                    />
                    <span className="text-neutral-700">{horario}</span>
                  </label>
                ))}
              </div>
              {errores.horario && (
                <p className="mt-2 text-sm text-red-600">{errores.horario}</p>
              )}
            </fieldset>

            {valores.horario === "Horario específico" && (
              <div>
                <label
                  htmlFor="campo-horarioDetalle"
                  className="block text-sm font-semibold text-neutral-800 mb-2"
                >
                  Escribí el horario que preferís{" "}
                  <span className="text-red-600">*</span>
                </label>
                <input
                  id="campo-horarioDetalle"
                  type="text"
                  placeholder="Ej.: martes después de las 15 h"
                  value={valores.horarioDetalle}
                  onChange={(e) => setCampo("horarioDetalle", e.target.value)}
                  aria-invalid={!!errores.horarioDetalle}
                  className={`${inputStyles} ${errores.horarioDetalle ? inputError : ""}`}
                />
                {errores.horarioDetalle && (
                  <p className="mt-2 text-sm text-red-600">
                    {errores.horarioDetalle}
                  </p>
                )}
              </div>
            )}
          </section>

          {/* ── Información adicional ───────────────────────────── */}
          <section className="space-y-6">
            <h2 className={seccionStyles}>Información adicional</h2>

            <div>
              <label
                htmlFor="campo-patologia"
                className="block text-sm font-semibold text-neutral-800 mb-2"
              >
                ¿Tu mascota tiene alguna patología o necesidad especial?
              </label>
              <p className="text-sm text-neutral-500 mb-2">
                ⓘ Ejemplo: alergias, problemas de piel, medicación, ansiedad,
                dificultades para caminar, comportamiento durante el baño o
                cualquier información importante.
              </p>
              <textarea
                id="campo-patologia"
                rows={4}
                value={valores.patologia}
                onChange={(e) => setCampo("patologia", e.target.value)}
                className={`${inputStyles} resize-y`}
              />
            </div>

            <div>
              <label
                htmlFor="campo-comentarios"
                className="block text-sm font-semibold text-neutral-800 mb-2"
              >
                Otros comentarios
              </label>
              <p className="text-sm text-neutral-500 mb-2">
                Contanos cualquier otro detalle que nos ayude a preparar el
                turno.
              </p>
              <textarea
                id="campo-comentarios"
                rows={4}
                value={valores.comentarios}
                onChange={(e) => setCampo("comentarios", e.target.value)}
                className={`${inputStyles} resize-y`}
              />
            </div>
          </section>

          {/* ── Resumen de errores + envío ──────────────────────── */}
          {listaFaltantes.length > 0 && (
            <div
              role="alert"
              className="rounded-lg border border-red-300 bg-red-50 p-4"
            >
              <p className="font-semibold text-red-700 mb-2">
                Faltan completar {listaFaltantes.length}{" "}
                {listaFaltantes.length === 1 ? "campo" : "campos"}:
              </p>
              <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
                {listaFaltantes.map((campo) => (
                  <li key={campo}>
                    <button
                      type="button"
                      onClick={() =>
                        document.getElementById(`campo-${campo}`)?.focus()
                      }
                      className="underline hover:no-underline"
                    >
                      {ETIQUETAS[campo] ?? campo}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="space-y-4">
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full sm:w-auto bg-accent hover:bg-accent-dark hover:text-white text-neutral-900 px-8 py-4 rounded-lg font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "sending" ? "Enviando..." : "Reservar turno"}
            </button>

            {status === "ok" && (
              <p className="text-primary font-semibold" role="status">
                ¡Gracias! Recibimos tu reserva y te contactaremos pronto. 🐾
              </p>
            )}

            {status === "error" && (
              <p className="text-red-600 font-semibold" role="alert">
                Hubo un problema al enviar. Intentá de nuevo o escribinos
                directamente.
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
