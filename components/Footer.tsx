import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-dark text-neutral-50 flex justify-center">
      <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Marca */}
          <div>
            <h3 className="font-serif text-xl font-bold text-white mb-2">
              Olivia&apos;s Pet Spa
            </h3>
            <p className="text-neutral-200 text-sm">
              La experiencia de un spa para tu mascota, en la puerta de tu casa.
            </p>
          </div>

          {/* Enlaces Rápidos */}
          <div>
            <h4 className="font-semibold text-white mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-neutral-200 hover:text-primary transition-colors"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-neutral-200 hover:text-primary transition-colors"
                >
                  Servicios
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="2 hover:text-primary transition-colors"
                >
                  Galería
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-neutral-200 hover:text-primary transition-colors"
                >
                  Acerca de
                </Link>
              </li>
            </ul>
          </div>

          {/* Información de Contacto */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contacto</h4>
            <ul className="space-y-2 text-sm text-neutral-200">
              <li>📞 Teléfono: 095 493 845</li>
              <li>✉️ Correo electrónico: oliviapetspa@gmail.com</li>
            </ul>
          </div>

          {/* Horarios */}
          <div>
            <h4 className="font-semibold text-white mb-4">Horarios</h4>
            <ul className="space-y-2 text-sm text-neutral-200">
              <li>Lunes a sábado: 9:00 a 20:00 hs</li>
              <li>Domingos: Cerrado</li>
            </ul>
          </div>
        </div>
        {/* Credit Line */}
        <div className="border-t border-neutral-500 mt-8 pt-6 text-center text-xs text-neutral-400">
          <p>
            Developed by{" "}
            <span className="text-neutral-200 font-semibold">
              Mateo Codecraft
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
