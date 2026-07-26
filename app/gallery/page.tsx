import Link from "next/link";

const DESTACADOS = [
  {
    emoji: "🐕",
    nombre: "Max",
    raza: "Golden Retriever",
    descripcion:
      "Deslanado completo y baño hidratante. Tres horas de trabajo para dejarlo como nuevo.",
  },
  {
    emoji: "🐩",
    nombre: "Luna",
    raza: "Caniche",
    descripcion:
      "Corte de raza clásico, corte de uñas y limpieza de oídos a domicilio.",
  },
  {
    emoji: "🐶",
    nombre: "Rocky",
    raza: "Schnauzer",
    descripcion:
      "Corte de barba y cejas con tijera, más tratamiento anti-caída.",
  },
];

const ANTES_DESPUES = [
  { emoji: "🐕", nombre: "Simba", raza: "Labrador", servicio: "Aseo completo" },
  { emoji: "🐩", nombre: "Coco", raza: "Bichón", servicio: "Corte de pelo" },
  { emoji: "🐕‍🦺", nombre: "Nala", raza: "Border Collie", servicio: "Deslanado" },
  { emoji: "🦮", nombre: "Toby", raza: "Beagle", servicio: "Baño y uñas" },
  { emoji: "🐶", nombre: "Kira", raza: "Pomerania", servicio: "Corte de raza" },
  { emoji: "🐕", nombre: "Bruno", raza: "Husky", servicio: "Deslanado" },
];

export default function Gallery() {
  return (
    <div>
      {/* Encabezado */}
      <section className="bg-primary text-white py-20 md:py-28 flex justify-center">
        <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">
              Galería de trabajos realizados
            </h1>
            <p className="text-xl text-neutral-100">
              Descubre nuestra calidad en cada corte, cada baño y cada mascota
              feliz que sale de nuestro spa móvil.
            </p>
          </div>
        </div>
      </section>

      {/* Trabajos destacados */}
      <section className="py-20 md:py-28 bg-background flex justify-center">
        <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-serif font-bold text-center mb-4">
            Trabajos destacados
          </h2>
          <p className="text-neutral-600 text-lg text-center mb-12">
            Algunos de nuestros favoritos de los últimos meses.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {DESTACADOS.map((trabajo, i) => (
              <div
                key={i}
                className="bg-white border border-neutral-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Reemplaza este bloque por una foto real */}
                <div className="relative h-64 bg-primary-light flex items-center justify-center">
                  <span className="text-7xl">{trabajo.emoji}</span>
                  <span className="absolute top-3 left-3 bg-accent text-neutral-900 text-xs font-semibold px-3 py-1 rounded-full">
                    Destacado
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-primary mb-1">
                    {trabajo.nombre}
                  </h3>
                  <p className="text-sm text-neutral-500 mb-3">
                    {trabajo.raza}
                  </p>
                  <p className="text-neutral-600">{trabajo.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Antes y después */}
      <section className="py-20 md:py-28 bg-white flex justify-center">
        <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-serif font-bold text-center mb-4">
            Antes y después
          </h2>
          <p className="text-neutral-600 text-lg text-center mb-12">
            La transformación habla por sí sola.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ANTES_DESPUES.map((trabajo, i) => (
              <div
                key={i}
                className="border border-neutral-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="grid grid-cols-2">
                  {/* Antes */}
                  <div className="relative h-44 bg-neutral-200 flex items-center justify-center">
                    <span className="text-5xl opacity-70">{trabajo.emoji}</span>
                    <span className="absolute top-2 left-2 bg-neutral-900/70 text-white text-xs font-semibold px-2 py-1 rounded">
                      Antes
                    </span>
                  </div>
                  {/* Después */}
                  <div className="relative h-44 bg-primary-light flex items-center justify-center border-l border-neutral-200">
                    <span className="text-5xl">{trabajo.emoji}</span>
                    <span className="absolute top-2 left-2 bg-primary text-white text-xs font-semibold px-2 py-1 rounded">
                      Después
                    </span>
                  </div>
                </div>
                <div className="p-4 bg-white">
                  <h3 className="font-semibold text-primary">
                    {trabajo.nombre}
                  </h3>
                  <p className="text-sm text-neutral-600">
                    {trabajo.raza} · {trabajo.servicio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Llamado a la acción */}
      <section className="py-20 bg-background flex justify-center">
        <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-serif font-bold mb-4">
            ¿Quieres que tu mascota sea la próxima?
          </h2>
          <p className="text-neutral-600 text-lg mb-8">
            Agenda tu cita y te llevamos el spa hasta la puerta de tu casa.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-accent hover:bg-accent-dark hover:text-white text-neutral-900 px-8 py-4 rounded-lg font-semibold transition-colors"
          >
            Agendar ahora
          </Link>
        </div>
      </section>
    </div>
  );
}
