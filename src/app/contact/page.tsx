import Link from "next/link";
import Image from "next/image";
import { buildMetadata } from "@/lib/seo/metadata";
import { PHONE, EMAIL, COUNTIES, SITE_URL } from "@/lib/site-config";
import { Phone, Mail, Clock, MapPin, ArrowRight } from "lucide-react";

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

      {/* Hero banner — video */}
      <section className="relative bg-brand-900 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/images/grandma-coffee.webp"
          className="w-full h-56 sm:h-72 object-cover object-[center_25%] opacity-30"
        >
          <source src="/images/father-daughter-loop.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-white">Get in Touch</h1>
            <p className="mt-3 text-lg text-gray-200 max-w-xl mx-auto">
              Questions about intake, pricing, or the process? We respond within 8 business hours.
            </p>
          </div>
        </div>
      </section>

      {/* Primary contact — phone + email as big CTAs */}
      <section className="relative -mt-8 z-10">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href={`tel:${PHONE.replace(/[^+\d]/g, "")}`}
              className="flex items-center gap-4 rounded-xl bg-surface-card p-5 shadow-lg border border-border-default hover:shadow-xl hover:border-accent-300 transition-all group"
            >
              <div className="shrink-0 w-12 h-12 rounded-full bg-surface-accent flex items-center justify-center group-hover:bg-surface-accent transition-colors">
                <Phone className="h-5 w-5 text-accent-600" />
              </div>
              <div>
                <p className="text-sm text-text-muted font-medium">Call us</p>
                <p className="text-lg font-semibold text-text-heading">{PHONE}</p>
              </div>
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="flex items-center gap-4 rounded-xl bg-surface-card p-5 shadow-lg border border-border-default hover:shadow-xl hover:border-accent-300 transition-all group"
            >
              <div className="shrink-0 w-12 h-12 rounded-full bg-surface-accent flex items-center justify-center group-hover:bg-surface-accent transition-colors">
                <Mail className="h-5 w-5 text-accent-600" />
              </div>
              <div>
                <p className="text-sm text-text-muted font-medium">Email us</p>
                <p className="text-lg font-semibold text-text-heading">Send a Message</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Team + details — balanced layout */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-10 items-start">

            {/* Left: Team image with overlay */}
            <div className="lg:w-1/2">
              <div className="relative rounded-2xl overflow-hidden shadow-md">
                <Image
                  src="/images/team-headshots.webp"
                  alt="Four SafePair supervised visitation providers"
                  width={600}
                  height={400}
                  className="w-full h-auto object-contain"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-900/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-white font-semibold">Our Team</p>
                  <p className="text-gray-200 text-sm mt-1">Background-checked, certified, and committed to your child&apos;s safety.</p>
                </div>
              </div>
            </div>

            {/* Right: Hours + Service Area + response promise */}
            <div className="lg:w-1/2 space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-text-heading mb-6">Here When You Need Us</h2>
              </div>

              <div className="flex gap-4 items-start">
                <div className="shrink-0 w-10 h-10 rounded-lg bg-surface-subtle flex items-center justify-center">
                  <Clock className="h-5 w-5 text-accent-600" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-text-heading">Hours</h3>
                  <p className="text-sm text-text-body mt-1">Intake processing: Monday – Friday</p>
                  <p className="text-sm text-text-body">Visit scheduling: 7 days a week</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="shrink-0 w-10 h-10 rounded-lg bg-surface-subtle flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-accent-600" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-text-heading">Service Area</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {liveCounties.map((c) => (
                      <Link
                        key={c.slug}
                        href={`/counties/${c.slug}`}
                        className="inline-block rounded-full bg-surface-subtle px-3 py-1 text-sm text-text-body hover:bg-surface-accent hover:text-accent-600 transition-colors"
                      >
                        {c.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-surface-accent border border-border-default p-5">
                <p className="text-sm font-semibold text-accent-600">Response Guarantee</p>
                <p className="text-sm text-accent-600 mt-1">
                  Every inquiry gets a response within 8 business hours or by end of the business day — whichever comes first.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Start online — wide CTA banner with video */}
      <section className="bg-brand-900">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col sm:flex-row">
            <div className="shrink-0 sm:w-80">
              <video
                autoPlay
                loop
                muted
                playsInline
                poster="/images/reading-poster.webp"
                className="w-full h-48 sm:h-full object-cover object-[center_35%]"
              >
                <source src="/images/reading-loop.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="p-8 sm:p-10 flex flex-col justify-center">
              <h2 className="text-xl font-semibold text-white mb-3">Prefer to Start Online?</h2>
              <p className="text-gray-300 text-sm mb-6 max-w-md">
                The intake form takes about 5 minutes. You&apos;ll see your total cost before you pay, and SafePair will review your case within 1-2 business days.
              </p>
              <div>
                <Link
                  href="/start"
                  className="inline-flex items-center gap-2 rounded-lg bg-accent-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-surface-accent0 transition-colors"
                >
                  Start Intake Online
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What to expect — two cards */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="rounded-xl overflow-hidden shadow-sm border border-border-default">
              <Image
                src="/images/provider-review.webp"
                alt="Provider reviewing case documentation"
                width={400}
                height={200}
                className="w-full h-44 object-cover object-[center_35%]"
              />
              <div className="p-6">
                <h3 className="text-base font-semibold text-text-heading mb-2">Fast Response</h3>
                <p className="text-sm text-text-body">
                  Intake responses within 8 business hours. SafePair reviews cases within 1-2 business days and contacts you to schedule.
                </p>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden shadow-sm border border-border-default">
              <Image
                src="/images/secure-entrance.webp"
                alt="Secure entrance with family safety icon"
                width={400}
                height={200}
                className="w-full h-44 object-cover object-[center_35%]"
              />
              <div className="p-6">
                <h3 className="text-base font-semibold text-text-heading mb-2">Confidential &amp; Secure</h3>
                <p className="text-sm text-text-body">
                  Your information is protected. All communication is confidential. Payment processed securely through Stripe.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
