import Link from "next/link";
import ImportanteLink from "./ImportanteLink";

// Types
interface PricingByWeight {
  minKg: number;
  maxKg: number | null;
  price: number;
}

interface Service {
  id: string;
  name: string;
  description: string;
  includes: string[];
  pricing: PricingByWeight[];
  note?: string;
}

interface Additional {
  id: string;
  name: string;
  price: string;
}

// Constantes de validación
const MAX_LENGTH = {
  serviceName: 40,
  serviceDescription: 80,
  includeItem: 50,
  additionalName: 45,
  serviceNote: 120,
} as const;

// Servicios principales
const SERVICIOS: Service[] = [
  {
    id: "bano-pelo-corto",
    name: "Baño pelo corto",
    description: "Servicio básico para perros de pelo corto",
    includes: [
      "Baño",
      "Corte de uñas",
      "Limpieza de oídos",
      "Corte higiénico",
      "Perfume canino",
    ],
    pricing: [
      { minKg: 0, maxKg: 10, price: 800 },
      { minKg: 10, maxKg: 20, price: 1100 },
      { minKg: 20, maxKg: 30, price: 1400 },
      { minKg: 30, maxKg: null, price: 1700 },
    ],
  },
  {
    id: "bano-pelo-largo",
    name: "Baño razas de pelo largo",
    description: "Servicio especializado para razas de pelo largo",
    includes: [
      "Baño",
      "Corte de uñas",
      "Limpieza de oídos",
      "Corte higiénico",
      "Perfume canino",
    ],
    pricing: [
      { minKg: 0, maxKg: 10, price: 1100 },
      { minKg: 10, maxKg: 20, price: 1300 },
      { minKg: 20, maxKg: 30, price: 1600 },
      { minKg: 30, maxKg: null, price: 1900 },
    ],
  },
  {
    id: "mantenimiento-pelo-largo",
    name: "Mantenimiento para pelo largo",
    description: "Exclusivo para clientes con mantenimiento mensual",
    includes: [
      "Baño",
      "Cepillado",
      "Corte higiénico",
      "Corte de uñas",
      "Limpieza de oídos",
      "Perfume",
    ],
    pricing: [
      { minKg: 0, maxKg: 10, price: 800 },
      { minKg: 10, maxKg: 20, price: 1100 },
      { minKg: 20, maxKg: 30, price: 1400 },
      { minKg: 30, maxKg: null, price: 1700 },
    ],
    note: "Disponible para clientes que realizan mantenimiento al menos una vez por mes",
  },
  {
    id: "servicio-completo",
    name: "Servicio completo de estética",
    description: "Servicio premium con corte personalizado",
    includes: [
      "Baño",
      "Corte de uñas",
      "Limpieza de oídos",
      "Corte higiénico",
      "Perfume",
      "Corte a elección (largo, pulido o carita)",
    ],
    pricing: [
      { minKg: 0, maxKg: 10, price: 1400 },
      { minKg: 10, maxKg: 20, price: 1600 },
      { minKg: 20, maxKg: 30, price: 2100 },
      { minKg: 30, maxKg: null, price: 2700 },
    ],
    note: "El pelaje debe estar en buen estado y correctamente mantenido para cortes largos",
  },
  {
    id: "deslanado",
    name: "Deslanado",
    description: "Extracción profunda de pelo muerto",
    includes: [
      "Extracción de pelo muerto",
      "Baño",
      "Corte higiénico",
      "Corte de uñas",
      "Limpieza de oídos",
      "Perfume",
    ],
    pricing: [
      { minKg: 0, maxKg: 10, price: 1500 },
      { minKg: 10, maxKg: 20, price: 1900 },
      { minKg: 20, maxKg: 30, price: 2200 },
      { minKg: 30, maxKg: null, price: 2700 },
    ],
  },
];

// Servicios adicionales
const ADICIONALES: Additional[] = [
  { id: "antipulgas", name: "Antipulgas", price: "+$200" },
  { id: "shampoo-hipo", name: "Shampoo hipoalergénico", price: "+$200" },
  {
    id: "shampoo-blancos",
    name: "Shampoo para realzar blancos",
    price: "+$200",
  },
  { id: "trat-manto", name: "Tratamiento nutritivo de manto", price: "+$250" },
  { id: "enredos", name: "Enredos severos", price: "+$300 a $500" },
  { id: "reactivos", name: "Perros muy reactivos", price: "+$300" },
  { id: "glandulas", name: "Vaciado de glándulas anales", price: "+$400" },
];

// Helpers
function truncate(text: string, maxLength: number): string {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}

function formatPrice(price: number): string {
  return `$${price.toLocaleString("es-AR")}`;
}

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

      {/* Servicios principales */}
      <section className="py-20 md:py-28 bg-background flex justify-center">
        <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-serif font-bold text-center mb-4">
            Nuestros servicios
          </h2>
          <p className="text-neutral-600 text-lg text-center mb-12">
            Los precios dependen del tamaño y tipo de manto de tu mascota.
          </p>

          <div className="space-y-6 md:space-y-8">
            {SERVICIOS.map((servicio) => (
              <div
                key={servicio.id}
                className="group relative bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="h-1.5 w-full bg-gradient-to-r from-primary to-accent" />
                <div className="p-5 sm:p-6 md:p-8">
                  {/* Encabezado */}
                  <div className="mb-6 flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-serif font-bold text-primary mb-1">
                        {truncate(servicio.name, MAX_LENGTH.serviceName)}
                      </h3>
                      <p className="text-neutral-600 text-sm">
                        {truncate(
                          servicio.description,
                          MAX_LENGTH.serviceDescription,
                        )}
                      </p>
                    </div>
                    <span className="inline-flex items-center whitespace-nowrap rounded-full bg-primary/10 px-3 py-1 text-sm font-bold text-primary">
                      Desde{" "}
                      {formatPrice(
                        Math.min(...servicio.pricing.map((tier) => tier.price)),
                      )}
                    </span>
                  </div>

                  {/* Grid con Incluye y Precios por peso */}
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                    {/* Incluye */}
                    <div className="md:col-span-2">
                      <p className="font-semibold text-neutral-900 mb-3 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        Incluye
                      </p>
                      <ul className="space-y-2.5">
                        {servicio.includes.map((item, idx) => (
                          <li
                            key={idx}
                            className="flex gap-2.5 text-neutral-600 text-sm"
                          >
                            <span className="flex items-center justify-center w-4 h-4 rounded-full bg-primary/10 text-primary text-[10px] font-bold flex-shrink-0 mt-0.5">
                              ✓
                            </span>
                            <span>
                              {truncate(item, MAX_LENGTH.includeItem)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Precios por peso */}
                    <div className="md:col-span-3">
                      <p className="font-semibold text-neutral-900 mb-3 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-dark" />
                        Según el peso
                      </p>
                      <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                        {servicio.pricing.map((tier, idx) => (
                          <div
                            key={idx}
                            className="rounded-xl border border-neutral-200 bg-background/60 px-3 py-2.5 sm:px-4 sm:py-3 hover:border-primary/40 hover:bg-primary/5 transition-colors"
                          >
                            <p className="text-xs text-neutral-500 font-medium mb-0.5">
                              {tier.minKg}
                              {tier.maxKg ? ` a ${tier.maxKg}` : "+"} kg
                            </p>
                            <p className="text-base sm:text-lg font-bold text-primary">
                              {formatPrice(tier.price)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Nota si existe */}
                  {servicio.note && (
                    <div className="mt-6 flex gap-3 bg-accent/10 border border-accent/20 rounded-xl p-4">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent-dark text-white flex-shrink-0">
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-4 h-4"
                          aria-hidden="true"
                        >
                          <circle cx="12" cy="12" r="9.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                          <circle cx="12" cy="7.25" r="1.5" />
                          <rect x="11" y="10.5" width="2" height="7" rx="1" />
                        </svg>
                      </span>
                      <p className="text-sm text-neutral-700">
                        <span className="font-semibold">Importante: </span>
                        {truncate(servicio.note, MAX_LENGTH.serviceNote)}
                      </p>
                    </div>
                  )}
                </div>
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
            Agrégalos a cualquier servicio principal.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {ADICIONALES.map((adicional) => (
              <div
                key={adicional.id}
                className="flex items-center justify-between gap-4 bg-white border border-neutral-200 rounded-xl p-4 sm:p-5 shadow-sm hover:shadow-md hover:border-primary/30 hover:-translate-y-0.5 transition-all duration-300"
              >
                <span className="font-semibold text-neutral-900 flex items-center gap-2">
                  {truncate(adicional.name, MAX_LENGTH.additionalName)}
                  {adicional.id === "antipulgas" && (
                    <ImportanteLink targetId="importante-antipulgas" />
                  )}
                </span>
                <span className="inline-flex items-center whitespace-nowrap rounded-full bg-primary/10 px-3 py-1 text-sm font-bold text-primary">
                  {adicional.price}
                </span>
              </div>
            ))}
          </div>

          <p className="text-sm text-neutral-500 text-center mt-8">
            Los precios pueden variar según el estado del pelaje y el
            comportamiento de la mascota. Te confirmamos el valor final antes de
            empezar.
          </p>
        </div>
      </section>

      {/* Importante */}
      <section className="py-20 bg-white flex justify-center">
        <div className="max-w-4xl w-full px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          <div className="flex gap-4 bg-primary/5 border border-primary/20 rounded-2xl p-6 sm:p-8">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white flex-shrink-0">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="9.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="12" cy="7.25" r="1.5" />
                <rect x="11" y="10.5" width="2" height="7" rx="1" />
              </svg>
            </span>
            <div>
              <h3 className="text-lg sm:text-xl font-serif font-bold text-primary mb-2">
                Importante
              </h3>
              <p className="text-neutral-700 text-sm sm:text-base">
                Las reservas se coordinan con al menos una semana de
                anticipación para asegurar disponibilidad.
              </p>
            </div>
          </div>

          <div
            id="importante-antipulgas"
            className="flex gap-4 bg-primary/5 border border-primary/20 rounded-2xl p-6 sm:p-8 scroll-mt-24"
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white flex-shrink-0">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="9.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="12" cy="7.25" r="1.5" />
                <rect x="11" y="10.5" width="2" height="7" rx="1" />
              </svg>
            </span>
            <div>
              <h3 className="text-lg sm:text-xl font-serif font-bold text-primary mb-2">
                Importante
              </h3>
              <p className="text-neutral-700 text-sm sm:text-base">
                Si la mascota llega con pulgas o garrapatas, aplicamos un
                tratamiento específico con costo adicional. Recomendamos
                desparasitar antes del turno.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-background flex justify-center">
        <div className="max-w-4xl w-full px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-serif font-bold mb-4">
            ¿Listo para agendar?
          </h2>
          <p className="text-neutral-600 text-lg mb-8">
            Contáctanos y coordina el mejor día para tu mascota.
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
