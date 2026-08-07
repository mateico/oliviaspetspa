import Link from "next/link";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary text-white py-20 md:py-32 flex justify-center">
        <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8 ">
          <div className="max-w-2xl ">
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">
              Pet Spa sobre ruedas
            </h1>
            <p className="text-2xl text-neutral-100 mb-4">
              La experiencia de un spa para tu mascota, en la puerta de tu casa.
            </p>
            <p className="text-lg text-neutral-100 mb-8">
              Baño, peluquería y cuidado profesional a domicilio en Maldonado. Sin estrés, sin traslados y con atención personalizada.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-accent hover:bg-accent-dark text-neutral-900 px-8 py-4 rounded-lg font-semibold transition-colors"
            >
              Agendar
            </Link>
          </div>{" "}
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 md:py-28 bg-background flex justify-center">
        <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8 ">
          <h2 className="text-4xl font-serif font-bold text-center mb-12">
            Nuestros Servicios
          </h2>

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
