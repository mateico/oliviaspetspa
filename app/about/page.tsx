import Image from "next/image";
import Link from "next/link";

const PILARES = [
  {
    emoji: "🩺",
    title: "Salud primero",
    description:
      "Evaluamos el manto, la piel y las necesidades de cada mascota antes de decidir cualquier tratamiento.",
  },
  {
    emoji: "🧴",
    title: "Recuperación de mantos",
    description:
      "No esquilamos por comodidad. Priorizamos recuperar, mantener y prevenir, porque el pelo protege del frío, el sol y la humedad.",
  },
  {
    emoji: "🚐",
    title: "Vamos hasta tu puerta",
    description:
      "Una peluquería canina móvil, equipada y profesional, para que tu mascota disfrute sin salir de su entorno.",
  },
];

export default function About() {
  return (
    <div>
      {/* Encabezado */}
      <section className="bg-primary text-white py-16 md:py-28 flex justify-center">
        <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="mt-5 md:mt-0 text-sm md:text-base uppercase tracking-widest text-neutral-100/80 mb-3">
              Sobre nosotros
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif font-bold mb-4 leading-tight">
              No hacemos simplemente estética. Cuidamos salud.
            </h1>
            <p className="text-lg md:text-xl text-neutral-100">
              En Olivia&apos;s Pet Spa creemos que un perro hermoso es, ante
              todo, un perro saludable.
            </p>
          </div>
        </div>
      </section>

      {/* Nuestra historia */}
      <section className="py-16 md:py-28 bg-background flex justify-center">
        <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">
            <div className="order-1 md:order-2 relative aspect-[4/5] w-full rounded-lg overflow-hidden border border-neutral-200">
              <Image
                src="/about_us.jpeg"
                alt="Fundadora de Olivia's Pet Spa junto a su mascota y la peluquería canina móvil"
                fill
                className="object-cover"
              />
            </div>

            <div className="order-2 md:order-1">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                Nuestra historia
              </h2>
              <p className="text-neutral-600 text-lg mb-4">
                Nuestra historia nace de una pasión por los animales y de una
                profesión dedicada al cuidado. Soy Licenciada en Enfermería,
                graduada de la Universidad Católica, y encontré en la estética
                canina la manera de unir dos mundos que amo: la salud y los
                animales.
              </p>
              <p className="text-neutral-600 text-lg">
                Porque para nosotros, no existe estética sin salud.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recuperación de mantos */}
      <section className="py-16 md:py-28 bg-white flex justify-center">
        <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-serif font-bold">
              Especialistas en recuperación de mantos
            </h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            <p className="text-neutral-600 text-lg">
              No esquilamos por comodidad ni porque sea la opción más rápida.
              Siempre que el manto pueda recuperarse, nuestro objetivo es
              conservarlo, porque el pelo de tu mascota no está ahí solamente
              para verse bonito: es parte de su protección natural frente al
              frío, el sol, la humedad y el ambiente. Por eso, trabajamos para
              recuperar, mantener y prevenir.
            </p>
            <p className="text-neutral-600 text-lg">
              Cada mascota es única y merece un tratamiento pensado
              especialmente para ella. Evaluamos su manto, su piel y sus
              necesidades para ofrecer un servicio individualizado.
            </p>
          </div>
        </div>
      </section>

      {/* Peluquería móvil */}
      <section className="py-16 md:py-28 bg-background flex justify-center">
        <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-serif font-bold">
              Una peluquería que va hacia vos
            </h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            <p className="text-neutral-600 text-lg">
              Olivia&apos;s Pet Spa nació de una pregunta: ¿por qué tiene que
              ser el dueño quien lleve a su mascota a la peluquería? Así creamos
              nuestra propia peluquería canina móvil: un espacio profesional,
              equipado y diseñado para trabajar a domicilio.
            </p>
            <p className="text-neutral-600 text-lg">
              Vamos hasta tu puerta para que vos no tengas que trasladarte y, al
              mismo tiempo, para que tu mascota pueda disfrutar de su servicio
              sin salir de su entorno habitual. Menos traslados. Menos esperas.
              Más comodidad. Más atención individual.
            </p>
          </div>
        </div>
      </section>

      {/* Lo que nos mueve */}
      <section className="py-16 md:py-28 bg-white flex justify-center">
        <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12">
            Lo que nos mueve
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PILARES.map((pilar, i) => (
              <div
                key={i}
                className="p-6 border border-neutral-200 rounded-lg hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-4">{pilar.emoji}</div>
                <h3 className="text-xl font-semibold text-primary mb-2">
                  {pilar.title}
                </h3>
                <p className="text-neutral-600">{pilar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Llamado a la acción */}
      <section className="py-16 md:py-20 bg-primary text-white flex justify-center">
        <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 max-w-2xl mx-auto">
            Porque pensamos en los dos: en vos y en tu mascota
          </h2>
          <p className="text-neutral-100 text-lg mb-8">
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
