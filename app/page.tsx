import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative flex min-h-[calc(100svh)]  items-center justify-center overflow-hidden text-white">
        {/* Background image (placeholder) */}
        <Image
          src="/images/hero_image.png"
          alt="..."
          fill
          priority
          className="object-cover"
        />

        {/* Pink hue + darkening overlay */}
        <div className="absolute inset-0 bg-primary-dark/75" />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/70 via-primary-dark/50 to-neutral-900/80" />

        {/* Content */}
        <div className="relative z-10 flex w-full max-w-7xl justify-center px-4 py-24 sm:px-6 md:py-32 lg:px-8">
          <div className="max-w-3xl text-center">
            <div className="mx-auto mb-24 flex w-fit rounded-full border border-white/15 bg-white/10 p-12 pb-20 backdrop-blur-sm">
              <Image
                src="/olivia_hero-1.webp"
                alt="Olivia's Pet Spa"
                width={264}
                height={328}
                priority
                className="h-70 w-auto md:h-82"
              />
            </div>

            <p className="mb-8 inline-block rounded-full border border-white/15 bg-white/10 px-5 py-2 text-sm text-neutral-100 backdrop-blur-sm">
              Sin estrés, sin traslados y con atención personalizada.
            </p>

            <h1 className="mb-6 font-serif text-5xl font-bold md:text-6xl">
              Pet Spa sobre ruedas
            </h1>

            <p className="mb-4 text-2xl text-neutral-100">
              La experiencia de un spa para tu mascota, en la puerta de tu casa.
            </p>

            <p className="mb-10 text-lg text-neutral-200">
              Baño, peluquería y cuidado profesional a domicilio en Maldonado.
            </p>

            <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
              <Link
                href="/contact"
                className="inline-block rounded-lg bg-accent px-8 py-4 font-semibold text-neutral-900 transition-colors hover:bg-accent-dark"
              >
                Agendar
              </Link>
              <Link
                href="/services"
                className="font-semibold text-white transition-colors hover:text-accent"
              >
                Nuestros servicios →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
