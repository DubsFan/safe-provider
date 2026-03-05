import Link from "next/link";
import Image from "next/image";
import { buildMetadata } from "@/lib/seo/metadata";
import { PHONE, EMAIL, COUNTIES, SITE_URL } from "@/lib/site-config";
import { Phone, Mail, Clock, MapPin } from "lucide-react";

export const metadata = buildMetadata({
  title: "Contact SafeProvider — Supervised Visitation Intake Support",
  description: "Questions about supervised visitation intake? Call (408) 418-7474 or email. Response within 8 hours or by end of business day.",
  path: "/contact",
});

const liveCounties = COUNTIES.filter((c) => c.status === "live");

const contactSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "ContactPoint",
  telephone: PHONE,
  email: EMAIL,
  contactType: "customer service",
  availableLanguage: "English",
  url: `${SITE_URL}/contact`,
});

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: contactSchema }}
      />
      {/* Hero banner */}
      <section className="relative bg-brand-900 overflow-hidden">
        <Image
          src="/images/intake-flatlay.webp"
          alt="Notebook, pen, and ID badge on a desk — ready for intake"
          width={1400}
          height={500}
          className="w-full h-48 sm:h-64 object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-white">Contact Us</h1>
            <p className="mt-3 text-lg text-gray-200">
              Questions about intake, pricing, or the process? Reach out.
            </p>
          </div>
        </div>
      </section>

    <div className="py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="rounded-xl border border-brand-500/20 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <Phone className="h-5 w-5 text-accent-600" />
              <h2 className="text-lg font-semibold text-brand-900">Phone</h2>
            </div>
            <a href={`tel:${PHONE.replace(/[^+\d]/g, "")}`} className="text-brand-700 hover:text-accent-600">
              {PHONE}
            </a>
          </div>

          <div className="rounded-xl border border-brand-500/20 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <Mail className="h-5 w-5 text-accent-600" />
              <h2 className="text-lg font-semibold text-brand-900">Email</h2>
            </div>
            <a href={`mailto:${EMAIL}`} className="text-brand-700 hover:text-accent-600">
              {EMAIL}
            </a>
          </div>

          <div className="rounded-xl border border-brand-500/20 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <Clock className="h-5 w-5 text-accent-600" />
              <h2 className="text-lg font-semibold text-brand-900">Hours</h2>
            </div>
            <p className="text-brand-700">Intake processing: Monday through Friday</p>
            <p className="text-brand-700 mt-1">Visit scheduling handled directly by SafePair including weekends.</p>
          </div>

          <div className="rounded-xl border border-brand-500/20 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <MapPin className="h-5 w-5 text-accent-600" />
              <h2 className="text-lg font-semibold text-brand-900">Service Area</h2>
            </div>
            <ul className="text-brand-700 space-y-1">
              {liveCounties.map((c) => (
                <li key={c.slug}>
                  <Link href={`/counties/${c.slug}`} className="hover:text-accent-600">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Prefer to start online — image with copy */}
        <div className="mt-10 rounded-xl bg-brand-50 overflow-hidden">
          <div className="flex flex-col sm:flex-row">
            <div className="shrink-0 sm:w-44">
              <Image
                src="/images/virtual-visit-boy.webp"
                alt="Young boy participating in a supervised virtual visit on a laptop with headphones"
                width={400}
                height={224}
                className="w-full h-36 sm:h-full object-cover object-top"
              />
            </div>
            <div className="p-6">
              <h2 className="text-lg font-semibold text-brand-900 mb-2">Prefer to Start Online?</h2>
              <p className="text-sm text-brand-700 mb-4">
                The intake form takes about 5 minutes. You&apos;ll see your total cost before you pay, and SafePair will review your case within 1-2 business days.
              </p>
              <Link
                href="/start"
                className="inline-block rounded-lg bg-accent-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-accent-500 transition-colors"
              >
                Start Intake Online
              </Link>
            </div>
          </div>
        </div>

        <p className="mt-6 text-sm text-brand-500 text-center">
          Intake responses within 8 hours or by the end of the business day.
        </p>
      </div>
    </div>
    </>
  );
}
