import Link from "next/link";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary text-white py-20 md:py-32 flex justify-center">
        <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">
              Pet Spa sobre ruedas
            </h1>
            <p className="text-xl text-neutral-100 mb-8">
              Servicios de aseo para tus queridas mascotas. Llevamos la
              experiencia de spa a ti con nuestro servicio de peluquería móvil.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-accent hover:bg-accent-dark text-neutral-900 px-8 py-4 rounded-lg font-semibold transition-colors"
            >
              Agendar
            </Link>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 md:py-28 bg-background flex justify-center">
        <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-serif font-bold text-center mb-12">
            Nuestros Servicios
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Aseo Completo",
                description:
                  "Baño completo, corte de cabello, corte de uñas y limpieza de oídos.",
              },
              {
                title: "Tratamientos Especiales",
                description:
                  "Tratamiento anti-caída, tratamientos de spa y deslanado disponibles.",
              },
              {
                title: "Servicio Móvil",
                description: "¡Vamos a ti! Aseo profesional en tu puerta.",
              },
            ].map((service, i) => (
              <div
                key={i}
                className="p-6 border border-neutral-200 rounded-lg hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold text-primary mb-2">
                  {service.title}
                </h3>
                <p className="text-neutral-600">{service.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/services"
              className="text-primary hover:text-primaryDark font-semibold text-lg"
            >
              Ver Todos los Servicios →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
