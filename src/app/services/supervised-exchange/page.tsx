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
        <Image
          src="/images/hero-exchange.webp"
          alt="Neutral monitor facilitating a supervised custody exchange between parents"
          width={1400}
          height={500}
          className="w-full h-64 sm:h-80 object-cover opacity-50"
          priority
        />
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

        <div className="mt-8 space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-brand-900">Who Needs It</h2>
            <p className="mt-2 text-brand-700">
              Families with a court order requiring supervised exchange, or families who want a neutral third party present during custody transitions.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-brand-900">Typical Duration</h2>
            <p className="mt-2 text-brand-700">15-30 minutes per exchange.</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-brand-900">Where</h2>
            <p className="mt-2 text-brand-700">
              At a public location agreed upon by both parties and the provider.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-brand-900">What the Monitor Does</h2>
            <p className="mt-2 text-brand-700">
              Manages the handoff so both parents arrive and leave at separate times or in a structured sequence. Documents the exchange.
            </p>
          </div>

          <div className="rounded-xl border border-brand-500/20 bg-white p-6 shadow-sm">
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
          </div>
        </div>

        {/* Trust icons */}
        <div className="mt-12">
          <Image
            src="/images/trust-icons.webp"
            alt="Trust icons: background checks, certified training, strict confidentiality, neutral supervision, flexible scheduling, court-ready documentation"
            width={800}
            height={200}
            className="w-full rounded-xl"
          />
        </div>

        {/* Available counties */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-brand-900 mb-4">Available in 4 Bay Area Counties</h2>
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
        <div className="mt-8 flex flex-wrap gap-4 text-sm">
          <Link href="/services/supervised-visitation" className="text-accent-600 hover:text-accent-500 font-semibold">Supervised Visitation &rarr;</Link>
          <Link href="/pricing" className="text-accent-600 hover:text-accent-500 font-semibold">See Full Pricing &rarr;</Link>
          <Link href="/how-it-works" className="text-accent-600 hover:text-accent-500 font-semibold">How It Works &rarr;</Link>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/start"
            className="rounded-lg bg-accent-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-accent-500 transition-colors"
          >
            Start Intake
          </Link>
        </div>
      </div>
    </div>
    </>
  );
}
