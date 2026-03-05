"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone } from "lucide-react";
import { PHONE } from "@/lib/site-config";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

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
  const pathname = usePathname();

  // Close mobile menu on route change
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-40 bg-surface-page/95 backdrop-blur-md border-b border-border-default shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 sm:h-16 items-center justify-between">
          {/* Logo — smaller on mobile */}
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/images/logo.webp"
              alt="SafeProvider"
              width={180}
              height={48}
              className="h-8 w-auto sm:h-10 min-w-[120px] sm:min-w-[150px] dark:invert"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-text-body hover:text-text-heading transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={`tel:${PHONE.replace(/[^+\d]/g, "")}`}
              className="flex items-center gap-1 text-sm text-text-body hover:text-text-heading"
            >
              <Phone className="h-4 w-4" />
              {PHONE}
            </a>
            <ThemeToggle />
            <Link
              href="/start"
              className="rounded-lg bg-accent-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-accent-500 transition-colors"
            >
              Start Intake
            </Link>
          </div>

          {/* Mobile: phone icon + theme toggle + hamburger */}
          <div className="flex md:hidden items-center gap-1">
            <a
              href={`tel:${PHONE.replace(/[^+\d]/g, "")}`}
              className="p-2 text-text-body"
              aria-label="Call us"
            >
              <Phone className="h-5 w-5" />
            </a>
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-text-body"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 top-14 sm:top-16 bg-black/20 md:hidden z-30"
            onClick={() => setMobileOpen(false)}
          />
          {/* Drawer */}
          <nav className="fixed inset-x-0 top-14 sm:top-16 md:hidden z-40 bg-surface-page border-b border-border-default shadow-lg">
            <div className="px-6 py-5 space-y-1">
              {[...NAV_ITEMS, ...MOBILE_EXTRA].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-lg px-3 py-2.5 text-base font-medium text-text-body hover:bg-surface-muted hover:text-text-heading transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-3 mt-3 border-t border-border-default">
                <Link
                  href="/start"
                  className="block w-full rounded-lg bg-accent-600 px-6 py-3 text-center text-base font-semibold text-white shadow-sm hover:bg-accent-500 transition-colors"
                >
                  Start Intake
                </Link>
              </div>
            </div>
          </nav>
        </>
      )}
    </header>
  );
}
