import Link from "next/link";

const PLANES = [
  {
    tamano: "Pequeño",
    peso: "Hasta 10 kg",
    emoji: "🐕",
    precio: "$2.000",
    destacado: false,
    incluye: [
      "Baño con productos hipoalergénicos",
      "Secado y cepillado",
      "Corte de uñas",
      "Limpieza de oídos",
    ],
  },
  {
    tamano: "Mediano",
    peso: "De 10 a 25 kg",
    emoji: "🐩",
    precio: "$3.000",
    destacado: true,
    incluye: [
      "Baño con productos hipoalergénicos",
      "Secado y cepillado",
      "Corte de uñas",
      "Limpieza de oídos",
      "Corte de pelo básico",
    ],
  },
  {
    tamano: "Grande",
    peso: "Más de 25 kg",
    emoji: "🐕‍🦺",
    precio: "$4.000",
    destacado: false,
    incluye: [
      "Baño con productos hipoalergénicos",
      "Secado y cepillado",
      "Corte de uñas",
      "Limpieza de oídos",
      "Corte de pelo básico",
      "Deslanado incluido",
    ],
  },
];

const ADICIONALES = [
  {
    nombre: "Corte de pelo de raza",
    descripcion: "Corte con tijera según el estándar de la raza.",
    precio: "$35.000",
  },
  {
    nombre: "Deslanado profundo",
    descripcion: "Para razas de doble capa con mucha muda de pelo.",
    precio: "Desde $25.000",
  },
  {
    nombre: "Tratamiento anti-caída",
    descripcion: "Fortalece el pelaje y reduce la caída excesiva.",
    precio: "$30.000",
  },
  {
    nombre: "Cepillado dental",
    descripcion: "Higiene bucal suave con pasta apta para mascotas.",
    precio: "$15.000",
  },
  {
    nombre: "Baño medicado",
    descripcion: "Con shampoo especializado, requiere indicación veterinaria.",
    precio: "$20.000",
  },
];

export default function Services() {
  return (
    <div>
      {/* Encabezado */}
      <section className="bg-primary text-white py-20 md:py-28 flex justify-center">
        <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">
              Servicios y precios
            </h1>
            <p className="text-xl text-neutral-100">
              Precios claros, sin sorpresas. El traslado siempre va incluido
              dentro de la ciudad.
            </p>
          </div>
        </div>
      </section>

      {/* Planes por tamaño */}
      <section className="py-20 md:py-28 bg-background flex justify-center">
        <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-serif font-bold text-center mb-4">
            Aseo completo
          </h2>
          <p className="text-neutral-600 text-lg text-center mb-12">
            El precio depende del tamaño de tu mascota.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {PLANES.map((plan, i) => (
              <div
                key={i}
                className={`relative bg-white rounded-lg p-8 transition-shadow hover:shadow-lg ${
                  plan.destacado
                    ? "border-2 border-primary shadow-lg"
                    : "border border-neutral-200"
                }`}
              >
                {plan.destacado && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-neutral-900 text-xs font-semibold px-4 py-1 rounded-full">
                    Más solicitado
                  </span>
                )}

                <div className="text-5xl mb-4">{plan.emoji}</div>
                <h3 className="text-2xl font-serif font-bold mb-1">
                  {plan.tamano}
                </h3>
                <p className="text-sm text-neutral-500 mb-6">{plan.peso}</p>

                <p className="text-4xl font-bold text-primary mb-8">
                  {plan.precio}
                </p>

                <ul className="space-y-3 mb-8">
                  {plan.incluye.map((item, j) => (
                    <li key={j} className="flex gap-3 text-neutral-600">
                      <span className="text-primary font-bold">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className={`block text-center px-6 py-3 rounded-lg font-semibold transition-colors ${
                    plan.destacado
                      ? "bg-accent hover:bg-accent-dark hover:text-white text-neutral-900"
                      : "border border-primary text-primary hover:bg-primary hover:text-white"
                  }`}
                >
                  Agendar
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Servicios adicionales */}
      <section className="py-20 md:py-28 bg-white flex justify-center">
        <div className="max-w-4xl w-full px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-serif font-bold text-center mb-4">
            Servicios adicionales
          </h2>
          <p className="text-neutral-600 text-lg text-center mb-12">
            Agrégalos a cualquier plan de aseo completo.
          </p>

          <ul className="divide-y divide-neutral-200 border border-neutral-200 rounded-lg overflow-hidden">
            {ADICIONALES.map((servicio, i) => (
              <li
                key={i}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-6 hover:bg-background transition-colors"
              >
                <div>
                  <h3 className="text-lg font-semibold text-primary">
                    {servicio.nombre}
                  </h3>
                  <p className="text-neutral-600">{servicio.descripcion}</p>
                </div>
                <span className="text-xl font-bold text-neutral-900 whitespace-nowrap">
                  {servicio.precio}
                </span>
              </li>
            ))}
          </ul>

          <p className="text-sm text-neutral-500 text-center mt-8">
            Los precios pueden variar según el estado del pelaje y el
            comportamiento de la mascota. Te confirmamos el valor final antes de
            empezar.
          </p>
        </div>
      </section>

      {/* Llamado a la acción */}
      <section className="py-20 bg-background flex justify-center">
        <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-serif font-bold mb-4">
            ¿No sabes cuál elegir?
          </h2>
          <p className="text-neutral-600 text-lg mb-8">
            Cuéntanos sobre tu mascota y te recomendamos el servicio ideal.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-accent hover:bg-accent-dark hover:text-white text-neutral-900 px-8 py-4 rounded-lg font-semibold transition-colors"
          >
            Pedir asesoría
          </Link>
        </div>
      </section>
    </div>
  );
}
