"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [overHero, setOverHero] = useState(pathname === "/");

  useEffect(() => {
    // Only the home page has a hero behind the navbar.
    if (pathname !== "/") {
      setOverHero(false);
      return;
    }
    const onScroll = () =>
      setOverHero(window.scrollY < window.innerHeight - 64);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/services", label: "Servicios" },
    { href: "/gallery", label: "Galería" },
    { href: "/about", label: "Nosotros" },
    { href: "/contact", label: "Contacto" },
  ];

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 flex justify-center bg-primary-light/70 backdrop-blur-md transition-shadow duration-300 ${
        overHero
          ? "shadow-[0_8px_32px_-2px_rgba(251,217,228,0.30)]"
          : "shadow-[0_8px_28px_-6px_rgba(0,0,0,0.40)]"
      }`}
    >
      <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-serif font-bold text-primary">
              Olivia's Pet Spa
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-neutral-700 hover:text-primary transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              href="/contact"
              className="bg-accent hover:bg-accent-dark text-neutral-900 px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              Agendar
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 text-neutral-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2 text-neutral-700 hover:text-primary hover:bg-neutral-50 rounded transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="block px-3 py-2 bg-accent text-black rounded transition-colors font-medium text-center"
              onClick={() => setIsOpen(false)}
            >
              Agendar Ahora
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
