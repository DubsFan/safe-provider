import Link from "next/link";
import Image from "next/image";
import { buildMetadata } from "@/lib/seo/metadata";
import { serviceSchema } from "@/lib/seo/schemas";
import { FALLBACK_RATES, COUNTIES, SITE_URL } from "@/lib/site-config";
import { getPublicRates, centsToUSD } from "@/lib/supabase/rate-cards";

export const metadata = buildMetadata({
  title: "Supervised Visitation Services — Neutral Professional Monitoring",
  description: "Professional supervised visitation with a trained, neutral monitor. Court-ready documentation, Standard 5.20 compliant. Intake from $50/person, visits from $70/hour.",
  path: "/services/supervised-visitation",
});

export default async function SupervisedVisitationPage() {
  const rates = await getPublicRates();
  const vRate = rates.find((r) => r.service_slug === "supervised-visitation");

  const intake = vRate?.intake_per_adult_cents ?? FALLBACK_RATES.intake_per_adult_cents;
  const hourly = vRate?.hourly_rate_cents ?? FALLBACK_RATES.hourly_rate_cents;
  const platform = vRate?.platform_fee_cents ?? FALLBACK_RATES.platform_fee_cents;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serviceSchema({
          name: "Supervised Visitation",
          description: "Professional supervised visitation with a trained, neutral monitor. Court-ready documentation, Standard 5.20 compliant.",
          url: `${SITE_URL}/services/supervised-visitation`,
        }) }}
      />

      {/* Hero banner */}
      <section className="relative bg-brand-900 overflow-hidden">
        <Image
          src="/images/hero-visitation.webp"
          alt="Parent and child during a supervised visitation session with a professional monitor"
          width={1400}
          height={500}
          className="w-full h-64 sm:h-80 object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-white max-w-3xl mx-auto">Supervised Visitation</h1>
            <p className="mt-4 text-lg text-gray-200 max-w-2xl mx-auto">
              A trained, neutral third-party monitor is present during a parent&apos;s time with their child.
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
              Families with a court order requiring supervised visitation, or families who agree to supervision for safety reasons.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-brand-900">Typical Duration</h2>
            <p className="mt-2 text-brand-700">2 hours minimum per visit.</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-brand-900">Where</h2>
            <p className="mt-2 text-brand-700">
              At a location agreed upon by both parties and the provider. Options include parks, libraries, community centers, or the provider&apos;s office.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-brand-900">What the Monitor Does</h2>
            <p className="mt-2 text-brand-700">
              Observes the visit, enforces the rules in the court order, keeps written documentation, and can provide reports to parents and courts.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-brand-900">Reports &amp; Documentation</h2>
            <p className="mt-2 text-brand-700">
              Professional documentation and reports provided to parents and/or courts. Testimony available when requested.
            </p>
          </div>

          {/* Accent image */}
          <div className="max-w-xs">
            <Image
              src="/images/community-coloring.webp"
              alt="Parent and child drawing together at a community center"
              width={320}
              height={240}
              className="w-full rounded-xl shadow-sm"
            />
          </div>

          <div className="rounded-xl border border-brand-500/20 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-brand-900 mb-4">Pricing</h2>
            <ul className="space-y-2 text-brand-700">
              <li className="flex justify-between">
                <span>Intake (per person)</span>
                <span className="font-semibold text-brand-900">{centsToUSD(intake)}</span>
              </li>
              <li className="flex justify-between">
                <span>Hourly rate (2-hr minimum)</span>
                <span className="font-semibold text-brand-900">{centsToUSD(hourly)}</span>
              </li>
              <li className="flex justify-between border-t border-brand-500/20 pt-2">
                <span>Platform fee (per case)</span>
                <span className="font-semibold text-brand-900">{centsToUSD(platform)}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Standard 5.20 */}
        <div className="mt-12 rounded-xl bg-brand-100 p-6">
          <h2 className="text-2xl font-semibold text-brand-900 mb-3">What Does California Standard 5.20 Mean for You?</h2>
          <p className="text-brand-700">
            It means the person supervising your visit has passed a criminal background check, completed mandated training on child safety and domestic violence, and follows court-defined rules for neutrality, confidentiality, and documentation. It is the standard family courts use to verify provider qualifications.
          </p>
        </div>

        {/* Trust icons — compact */}
        <div className="mt-8 max-w-sm">
          <Image
            src="/images/trust-icons.webp"
            alt="Background checks, certified training, confidentiality, neutral supervision"
            width={400}
            height={100}
            className="w-full rounded-lg opacity-80"
          />
        </div>

        {/* Available counties */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-brand-900 mb-4">Available in 4 Bay Area Counties</h2>
          <div className="flex flex-wrap gap-3">
            {COUNTIES.filter((c) => c.status === "live").map((county) => (
              <Link
                key={county.slug}
                href={`/counties/${county.slug}/supervised-visitation`}
                className="rounded-lg border border-brand-500/20 bg-white px-4 py-2 text-sm text-brand-700 hover:bg-brand-100 transition-colors"
              >
                {county.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Cross-links */}
        <div className="mt-8 flex flex-wrap gap-4 text-sm">
          <Link href="/services/supervised-exchange" className="text-accent-600 hover:text-accent-500 font-semibold">Supervised Exchange &rarr;</Link>
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
