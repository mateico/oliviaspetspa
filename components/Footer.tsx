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
            <div className="flex gap-4 mt-4">
              <a
                href="https://www.facebook.com/share/1Bh7q86D3a/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-neutral-200 hover:text-primary transition-colors"
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                  <path d="M22 12.06C22 6.505 17.523 2 12 2S2 6.505 2 12.06c0 5.02 3.657 9.184 8.438 9.94v-7.03H7.898v-2.91h2.54V9.845c0-2.522 1.492-3.916 3.777-3.916 1.094 0 2.238.197 2.238.197v2.475h-1.26c-1.243 0-1.63.775-1.63 1.57v1.888h2.773l-.443 2.91h-2.33V22c4.78-.756 8.437-4.92 8.437-9.94z" />
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@oliviaspetspa"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="text-neutral-200 hover:text-primary transition-colors"
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                  <path d="M16.6 5.82c-.97-.86-1.6-2.03-1.72-3.34h-3.13v13.6a3.03 3.03 0 0 1-5.44 1.83 3.02 3.02 0 0 1 3.16-4.83v-3.19a6.2 6.2 0 0 0-1.14-.1 6.24 6.24 0 1 0 6.24 6.24V9.03a8.34 8.34 0 0 0 4.88 1.56V7.46a4.85 4.85 0 0 1-2.85-1.64z" />
                </svg>
              </a>
            </div>
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
              Mateo CodeCraft
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
