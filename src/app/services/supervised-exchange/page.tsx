import Link from "next/link";
import Image from "next/image";
import { buildMetadata } from "@/lib/seo/metadata";
import { serviceSchema } from "@/lib/seo/schemas";
import { FALLBACK_RATES, COUNTIES, SITE_URL } from "@/lib/site-config";
import { getPublicRates, centsToUSD } from "@/lib/supabase/rate-cards";

export const metadata = buildMetadata({
  title: "Supervised Custody Exchange — Conflict-Free Handoffs",
  description: "Supervised custody exchanges with a neutral professional. Structured handoffs that reduce conflict and protect your child. $70 per exchange.",
  path: "/services/supervised-exchange",
});

export default async function SupervisedExchangePage() {
  const rates = await getPublicRates();
  const eRate = rates.find((r) => r.service_slug === "supervised-exchange");

  const intake = eRate?.intake_per_adult_cents ?? FALLBACK_RATES.intake_per_adult_cents;
  const exchange = eRate?.exchange_fee_cents ?? FALLBACK_RATES.exchange_fee_cents;
  const platform = eRate?.platform_fee_cents ?? FALLBACK_RATES.platform_fee_cents;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serviceSchema({
          name: "Supervised Custody Exchange",
          description: "Supervised custody exchanges with a neutral professional. Structured handoffs that reduce conflict and protect your child.",
          url: `${SITE_URL}/services/supervised-exchange`,
        }) }}
      />

      {/* Hero banner */}
      <section className="relative bg-brand-900 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/images/exchange-school.webp"
          className="w-full h-64 sm:h-80 object-cover object-[center_40%] opacity-50"
        >
          <source src="/images/exchange-loop.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-white max-w-3xl mx-auto">Supervised Exchange</h1>
            <p className="mt-4 text-lg text-gray-200 max-w-2xl mx-auto">
              A trained, neutral third-party facilitates the handoff of children between parents.
            </p>
          </div>
        </div>
      </section>

    <div className="py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">

        {/* Narrative intro */}
        <p className="mt-4 text-brand-700 text-lg">
          Custody transitions are stressful. A supervised exchange means a trained, neutral monitor manages the handoff so both parents and the child feel safe.
        </p>

        {/* Who / Duration / Where — compact grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-xl bg-brand-50 p-5">
            <h2 className="text-sm font-semibold text-brand-900 uppercase tracking-wide">Who Needs It</h2>
            <p className="mt-2 text-sm text-brand-700">
              Families with a court order requiring supervised exchange, or parents who want a neutral third party during transitions.
            </p>
          </div>
          <div className="rounded-xl bg-brand-50 p-5">
            <h2 className="text-sm font-semibold text-brand-900 uppercase tracking-wide">Duration</h2>
            <p className="mt-2 text-sm text-brand-700">
              15-30 minutes per exchange. Quick, structured, and calm.
            </p>
          </div>
          <div className="rounded-xl bg-brand-50 p-5">
            <h2 className="text-sm font-semibold text-brand-900 uppercase tracking-wide">Location</h2>
            <p className="mt-2 text-sm text-brand-700">
              A public location agreed upon by both parties and the provider.
            </p>
          </div>
        </div>

        {/* What the monitor does — image paired with copy */}
        <div className="mt-12 flex flex-col sm:flex-row gap-6 items-start">
          <div className="shrink-0 w-full sm:w-48">
            <Image
              src="/images/private-hallway.webp"
              alt="Private office hallway with secure door — discretion and safety"
              width={192}
              height={144}
              className="w-full rounded-xl shadow-sm"
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-brand-900">How the Exchange Works</h2>
            <p className="mt-2 text-brand-700">
              The monitor ensures both parents arrive and leave at separate times or in a structured sequence. There is no direct contact between parents unless the court order allows it. Every exchange is documented.
            </p>
          </div>
        </div>

        {/* After the exchange — image paired with copy, reversed */}
        <div className="mt-10 flex flex-col sm:flex-row-reverse gap-6 items-start">
          <div className="shrink-0 w-full sm:w-48">
            <Image
              src="/images/park-visit-1.webp"
              alt="Father and daughter drawing together on a park bench after an exchange"
              width={192}
              height={144}
              className="w-full rounded-xl shadow-sm"
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-brand-900">After the Handoff</h2>
            <p className="mt-2 text-brand-700">
              Once the exchange is complete, the visiting parent has their scheduled time with the child. The transition is over in minutes, but the peace of mind lasts all day.
            </p>
          </div>
        </div>

        {/* Pricing */}
        <div className="mt-12 rounded-xl border border-brand-500/20 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-brand-900 mb-4">Pricing</h2>
          <ul className="space-y-2 text-brand-700">
            <li className="flex justify-between">
              <span>Intake (per person)</span>
              <span className="font-semibold text-brand-900">{centsToUSD(intake)}</span>
            </li>
            <li className="flex justify-between">
              <span>Per exchange</span>
              <span className="font-semibold text-brand-900">{centsToUSD(exchange)}</span>
            </li>
            <li className="flex justify-between border-t border-brand-500/20 pt-2">
              <span>Platform fee (per case)</span>
              <span className="font-semibold text-brand-900">{centsToUSD(platform)}</span>
            </li>
          </ul>
          <p className="mt-3 text-sm text-brand-500">
            Provider rates from the Santa Clara County court provider list.{" "}
            <Link href="/pricing" className="text-accent-600 hover:text-accent-500 font-semibold">See full pricing &rarr;</Link>
          </p>
        </div>

        {/* Compliance — text pills */}
        <div className="mt-12 rounded-xl bg-brand-100 p-6">
          <h2 className="text-xl font-semibold text-brand-900 mb-3">California Standard 5.20 Compliant</h2>
          <p className="text-brand-700">
            Your monitor has completed criminal background checks, mandated training, and follows court-defined rules for neutrality and documentation.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {["Background Checks", "Certified Training", "Strict Confidentiality", "Neutral Supervision", "Court-Ready Docs"].map((label) => (
              <span key={label} className="rounded-full bg-white px-3 py-1 text-xs font-medium text-brand-700 shadow-sm">
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Counties */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-brand-900 mb-2">Available in 4 Bay Area Counties</h2>
          <p className="text-sm text-brand-600 mb-4">Select your county to see local details and start intake.</p>
          <div className="flex flex-wrap gap-3">
            {COUNTIES.filter((c) => c.status === "live").map((county) => (
              <Link
                key={county.slug}
                href={`/counties/${county.slug}/supervised-exchange`}
                className="rounded-lg border border-brand-500/20 bg-white px-4 py-2 text-sm text-brand-700 hover:bg-brand-100 transition-colors"
              >
                {county.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Cross-links */}
        <div className="mt-10 flex flex-wrap gap-4 text-sm">
          <Link href="/services/supervised-visitation" className="text-accent-600 hover:text-accent-500 font-semibold">Supervised Visitation &rarr;</Link>
          <Link href="/how-it-works" className="text-accent-600 hover:text-accent-500 font-semibold">How It Works &rarr;</Link>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/start"
            className="rounded-lg bg-accent-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-accent-500 transition-colors"
          >
            Start Intake
          </Link>
          <p className="mt-3 text-sm text-brand-500">
            Response within 8 hours or by end of business day.
          </p>
        </div>
      </div>
    </div>
    </>
  );
}
