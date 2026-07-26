import Link from "next/link";

const VALORES = [
  {
    emoji: "🐾",
    title: "Amor por los animales",
    description:
      "Cada mascota que llega a nosotros recibe el mismo cariño y paciencia que le daríamos a la nuestra.",
  },
  {
    emoji: "✂️",
    title: "Manos expertas",
    description:
      "Años de experiencia en aseo y cortes para todo tipo de razas, pelajes y temperamentos.",
  },
  {
    emoji: "🚐",
    title: "Comodidad total",
    description:
      "Vamos hasta tu puerta. Sin traslados estresantes, sin salas de espera, sin complicaciones.",
  },
];

export default function About() {
  return (
    <div>
      {/* Encabezado */}
      <section className="bg-primary text-white py-20 md:py-28 flex justify-center">
        <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">
              Sobre nosotros
            </h1>
            <p className="text-xl text-neutral-100">
              Somos un pequeño equipo que convirtió el amor por las mascotas en
              un spa sobre ruedas.
            </p>
          </div>
        </div>
      </section>

      {/* Nuestra historia */}
      <section className="py-20 md:py-28 bg-background flex justify-center">
        <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-serif font-bold mb-6">
                Nuestra historia
              </h2>
              <p className="text-neutral-600 text-lg mb-4">
                Olivia&apos;s Pet Spa nació de una idea simple: llevar el
                cuidado profesional directamente a la casa de cada mascota.
                Sabemos que salir de casa puede ser estresante para ellas.
              </p>
              <p className="text-neutral-600 text-lg">
                Desde entonces acompañamos a decenas de familias, una cita a la
                vez, con productos suaves y mucha paciencia.
              </p>
            </div>

            {/* Reemplaza este bloque por una foto cuando la tengas */}
            <div className="h-72 md:h-80 rounded-lg bg-primary-light border border-neutral-200 flex items-center justify-center">
              <span className="text-6xl">🐩</span>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-20 md:py-28 bg-white flex justify-center">
        <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-serif font-bold text-center mb-12">
            Lo que nos mueve
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {VALORES.map((valor, i) => (
              <div
                key={i}
                className="p-6 border border-neutral-200 rounded-lg hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-4">{valor.emoji}</div>
                <h3 className="text-xl font-semibold text-primary mb-2">
                  {valor.title}
                </h3>
                <p className="text-neutral-600">{valor.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Llamado a la acción */}
      <section className="py-20 bg-background flex justify-center">
        <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-serif font-bold mb-4">
            ¿Listo para consentir a tu mascota?
          </h2>
          <p className="text-neutral-600 text-lg mb-8">
            Agenda una cita y llevamos el spa hasta tu puerta.
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
