import Link from "next/link";
import Image from "next/image";
import { buildMetadata } from "@/lib/seo/metadata";
import { PHONE, EMAIL, COUNTIES, SITE_URL } from "@/lib/site-config";
import { Phone, Mail, Clock, MapPin } from "lucide-react";

export const metadata = buildMetadata({
  title: "Contact SafeProvider — Supervised Visitation Intake Support",
  description: "Questions about supervised visitation intake? Call (510) 314-8298 or email. Response within 8 hours or by end of business day.",
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
              Questions about intake, pricing, or the process? We&apos;re here to help.
            </p>
          </div>
        </div>
      </section>

      <div className="py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

          {/* Contact cards + team image side by side */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left: Contact cards */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="rounded-xl border border-brand-500/20 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <Phone className="h-5 w-5 text-accent-600" />
                  <h2 className="text-lg font-semibold text-brand-900">Phone</h2>
                </div>
                <a href={`tel:${PHONE.replace(/[^+\d]/g, "")}`} className="text-brand-700 hover:text-accent-600 font-medium">
                  {PHONE}
                </a>
              </div>

              <div className="rounded-xl border border-brand-500/20 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <Mail className="h-5 w-5 text-accent-600" />
                  <h2 className="text-lg font-semibold text-brand-900">Email</h2>
                </div>
                <a href={`mailto:${EMAIL}`} className="text-brand-700 hover:text-accent-600 font-medium">
                  Send Email
                </a>
              </div>

              <div className="rounded-xl border border-brand-500/20 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="h-5 w-5 text-accent-600" />
                  <h2 className="text-lg font-semibold text-brand-900">Hours</h2>
                </div>
                <p className="text-sm text-brand-700">Intake processing: Monday – Friday</p>
                <p className="text-sm text-brand-700 mt-1">Visit scheduling: 7 days a week</p>
              </div>

              <div className="rounded-xl border border-brand-500/20 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <MapPin className="h-5 w-5 text-accent-600" />
                  <h2 className="text-lg font-semibold text-brand-900">Service Area</h2>
                </div>
                <ul className="text-sm text-brand-700 space-y-1">
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

            {/* Right: Team image */}
            <div className="lg:w-80 shrink-0">
              <div className="rounded-xl overflow-hidden shadow-sm">
                <Image
                  src="/images/team-headshots.webp"
                  alt="Four SafePair supervised visitation providers"
                  width={400}
                  height={600}
                  className="w-full object-cover"
                />
                <div className="bg-brand-50 p-4">
                  <p className="text-sm font-semibold text-brand-900">Our Team</p>
                  <p className="text-xs text-brand-600 mt-1">Background-checked, certified, and committed to your child&apos;s safety.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Start online — video with copy */}
          <div className="mt-12 rounded-xl bg-brand-50 overflow-hidden">
            <div className="flex flex-col sm:flex-row">
              <div className="shrink-0 sm:w-64">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster="/images/virtual-visit-boy.webp"
                  className="w-full h-44 sm:h-full object-cover object-[center_35%]"
                >
                  <source src="/images/father-daughter-loop.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="p-6 flex flex-col justify-center">
                <h2 className="text-lg font-semibold text-brand-900 mb-2">Prefer to Start Online?</h2>
                <p className="text-sm text-brand-700 mb-4">
                  The intake form takes about 5 minutes. You&apos;ll see your total cost before you pay, and SafePair will review your case within 1-2 business days.
                </p>
                <div>
                  <Link
                    href="/start"
                    className="inline-block rounded-lg bg-accent-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-accent-500 transition-colors"
                  >
                    Start Intake Online
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* What to expect */}
          <div className="mt-12 flex flex-col sm:flex-row gap-6">
            <div className="flex-1 rounded-xl border border-brand-500/20 bg-white p-6 shadow-sm">
              <Image
                src="/images/provider-review.webp"
                alt="Provider reviewing case documentation"
                width={400}
                height={200}
                className="w-full h-36 object-cover object-[center_35%] rounded-lg mb-4"
              />
              <h3 className="text-base font-semibold text-brand-900 mb-2">Fast Response</h3>
              <p className="text-sm text-brand-700">
                Intake responses within 8 business hours or by end of business day. SafePair reviews cases within 1-2 business days.
              </p>
            </div>
            <div className="flex-1 rounded-xl border border-brand-500/20 bg-white p-6 shadow-sm">
              <Image
                src="/images/secure-entrance.webp"
                alt="Secure entrance with family safety icon"
                width={400}
                height={200}
                className="w-full h-36 object-cover rounded-lg mb-4"
              />
              <h3 className="text-base font-semibold text-brand-900 mb-2">Confidential &amp; Secure</h3>
              <p className="text-sm text-brand-700">
                Your information is protected. All communication is confidential. Payment processed securely through Stripe.
              </p>
            </div>
          </div>

          <p className="mt-8 text-sm text-brand-500 text-center">
            Intake responses within 8 hours or by the end of the business day.
          </p>
        </div>
      </div>
    </>
  );
}
