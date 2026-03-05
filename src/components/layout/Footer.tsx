import Link from "next/link";
import { PHONE, EMAIL } from "@/lib/site-config";

const COUNTY_LINKS = [
  { href: "/counties/santa-clara", label: "Santa Clara County" },
  { href: "/counties/alameda", label: "Alameda County" },
  { href: "/counties/contra-costa", label: "Contra Costa County" },
  { href: "/counties/san-francisco", label: "San Francisco County" },
];

const RESOURCE_LINKS = [
  { href: "/how-it-works", label: "How It Works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/faq", label: "FAQ" },
  { href: "/for-attorneys", label: "For Attorneys" },
];

const LEGAL_LINKS = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/notice-at-collection", label: "Notice at Collection" },
];

export function Footer() {
  return (
    <footer className="bg-brand-900 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Counties */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Counties</h3>
            <ul className="space-y-2">
              {COUNTY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-300 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Resources</h3>
            <ul className="space-y-2">
              {RESOURCE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-300 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Legal</h3>
            <ul className="space-y-2">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-300 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>
                <a href={`tel:${PHONE.replace(/[^+\d]/g, "")}`} className="text-sm text-gray-300 hover:text-white transition-colors">
                  {PHONE}
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className="text-sm text-gray-300 hover:text-white transition-colors">
                  Send Email
                </a>
              </li>
              <li className="pt-2">
                <Link href="/start" className="inline-block rounded-lg bg-accent-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-accent-500 transition-colors">
                  Start Intake
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer disclosure */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <p className="text-xs text-gray-400 text-center max-w-3xl mx-auto">
            Not a law firm. Not the court-listed provider. SafeProvider manages intake, scheduling, and payment only. All supervised visitation and exchange services are delivered by SafePair. SafeProvider and SafePair are separate entities. SafeProvider does not control SafePair&apos;s case acceptance, scheduling, or service delivery decisions.
          </p>
          <p className="text-xs text-gray-500 text-center mt-4">
            &copy; {new Date().getFullYear()} Safe Provider. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
