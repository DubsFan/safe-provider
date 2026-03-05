"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone } from "lucide-react";
import { PHONE } from "@/lib/site-config";

const NAV_ITEMS = [
  { href: "/counties", label: "Counties" },
  { href: "/pricing", label: "Pricing" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/for-attorneys", label: "For Attorneys" },
];

const MOBILE_EXTRA = [
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-brand-500/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.webp"
              alt="SafeProvider"
              width={180}
              height={48}
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-brand-700 hover:text-brand-900 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={`tel:${PHONE.replace(/[^+\d]/g, "")}`}
              className="flex items-center gap-1 text-sm text-brand-700 hover:text-brand-900"
            >
              <Phone className="h-4 w-4" />
              {PHONE}
            </a>
            <Link
              href="/start"
              className="rounded-lg bg-accent-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-accent-500 transition-colors"
            >
              Start Intake
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-brand-700"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-brand-500/20 bg-white">
          <div className="px-4 py-4 space-y-3">
            {[...NAV_ITEMS, ...MOBILE_EXTRA].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block text-sm text-brand-700 hover:text-brand-900"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={`tel:${PHONE.replace(/[^+\d]/g, "")}`}
              className="flex items-center gap-1 text-sm text-brand-700"
            >
              <Phone className="h-4 w-4" />
              {PHONE}
            </a>
            <Link
              href="/start"
              onClick={() => setMobileOpen(false)}
              className="block w-full rounded-lg bg-accent-600 px-6 py-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-accent-500"
            >
              Start Intake
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
