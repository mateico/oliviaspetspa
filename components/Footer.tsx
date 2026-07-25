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
              Spa de Mascotas de Olivia
            </h3>
            <p className="text-neutral-400 text-sm">
              Aseo profesional de mascotas a domicilio para tus compañeros
              queridos.
            </p>
          </div>

          {/* Enlaces Rápidos */}
          <div>
            <h4 className="font-semibold text-white mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-neutral-400 hover:text-primary transition-colors"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-neutral-400 hover:text-primary transition-colors"
                >
                  Servicios
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="text-neutral-400 hover:text-primary transition-colors"
                >
                  Galería
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-neutral-400 hover:text-primary transition-colors"
                >
                  Acerca de
                </Link>
              </li>
            </ul>
          </div>

          {/* Información de Contacto */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contacto</h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>Teléfono: (555) 123-4567</li>
              <li>Email: info@oliviaspetspa.com</li>
              <li>Disponible 7 días a la semana</li>
            </ul>
          </div>

          {/* Horarios */}
          <div>
            <h4 className="font-semibold text-white mb-4">Horarios</h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>Lun - Vie: 8am - 6pm</li>
              <li>Sáb - Dom: 9am - 5pm</li>
              <li>Servicio móvil disponible</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
