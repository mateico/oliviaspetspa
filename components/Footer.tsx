import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-dark text-neutral-50 flex justify-center">
      <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-xl font-bold text-white mb-2">
              Olivia's Pet Spa
            </h3>
            <p className="text-neutral-400 text-sm">
              Professional mobile pet grooming for your beloved companions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-neutral-400 hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-neutral-400 hover:text-primary transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="text-neutral-400 hover:text-primary transition-colors"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-neutral-400 hover:text-primary transition-colors"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>Phone: (555) 123-4567</li>
              <li>Email: info@oliviaspetspa.com</li>
              <li>Available 7 days a week</li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-semibold text-white mb-4">Hours</h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>Mon - Fri: 8am - 6pm</li>
              <li>Sat - Sun: 9am - 5pm</li>
              <li>Mobile service available</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-neutral-400 text-sm">
              © {currentYear} Olivia's Pet Spa. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link
                href="#"
                className="text-neutral-400 hover:text-primary transition-colors text-sm"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-neutral-400 hover:text-primary transition-colors text-sm"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
