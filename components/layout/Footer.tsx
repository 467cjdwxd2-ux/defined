import Link from "next/link";
import { BookOpen, Twitter, Instagram, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-chaos-pink flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-xl font-bold text-white font-display">
                Defined
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">
              Emotionally exposing people (and pets) since 2026. The internet's
              favorite fake dictionary.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Create
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                { href: "/generate", label: "Define Someone" },
                { href: "/generate?mode=pet", label: "Pet Edition" },
                { href: "/chaotic-definitions", label: "Trending Definitions" },
                { href: "/#products", label: "Products" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                { href: "/about", label: "About" },
                { href: "/faq", label: "FAQ" },
                { href: "/shipping", label: "Shipping" },
                { href: "/privacy", label: "Privacy" },
                { href: "/terms", label: "Terms" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <p>© 2026 Defined. All rights reserved. Too accurate to be legal.</p>
          <p className="flex items-center gap-1.5">
            Made with <Heart className="w-3.5 h-3.5 text-chaos-pink fill-current" /> and chaotic energy
          </p>
        </div>
      </div>
    </footer>
  );
}
