import Image from "next/image";
import Link from "next/link";

// Fotos individuales (retrato). Para agregar/quitar, edita esta lista.
const SINGLE_IMAGES = [
  { src: "/single1.webp", alt: "Mascota recién aseada en Olivia's Pet Spa" },
  { src: "/single2.webp", alt: "Mascota recién aseada en Olivia's Pet Spa" },
  { src: "/single3.webp", alt: "Mascota recién aseada en Olivia's Pet Spa" },
];

// Fotos de antes y después (horizontal). Para agregar/quitar, edita esta lista.
const BEFORE_AFTER_IMAGES = [
  { src: "/before-after.webp", alt: "Antes y después de un servicio de aseo canino" },
  { src: "/before-after(1).webp", alt: "Antes y después de un servicio de aseo canino" },
  { src: "/before-after(2).webp", alt: "Antes y después de un servicio de aseo canino" },
  { src: "/before-after(3).webp", alt: "Antes y después de un servicio de aseo canino" },
  { src: "/before-after(4).webp", alt: "Antes y después de un servicio de aseo canino" },
  { src: "/before-after(5).webp", alt: "Antes y después de un servicio de aseo canino" },
  { src: "/before-after(6).webp", alt: "Antes y después de un servicio de aseo canino" },
  { src: "/before-after(7).webp", alt: "Antes y después de un servicio de aseo canino" },
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

      {/* Fotos individuales */}
      <section className="py-20 md:py-28 bg-background flex justify-center">
        <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-serif font-bold text-center mb-4">
            Trabajos destacados
          </h2>
          <p className="text-neutral-600 text-lg text-center mb-12">
            Algunos de nuestros favoritos de los últimos meses.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {SINGLE_IMAGES.map((foto, i) => (
              <div
                key={foto.src}
                className="relative aspect-[3/4] w-full rounded-lg overflow-hidden border border-neutral-200 bg-neutral-100"
              >
                <Image
                  src={foto.src}
                  alt={foto.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                  loading={i === 0 ? "eager" : "lazy"}
                />
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {BEFORE_AFTER_IMAGES.map((foto) => (
              <div
                key={foto.src}
                className="relative aspect-[3/2] w-full rounded-lg overflow-hidden border border-neutral-200 bg-neutral-100"
              >
                <Image
                  src={foto.src}
                  alt={foto.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                  loading="lazy"
                />
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
