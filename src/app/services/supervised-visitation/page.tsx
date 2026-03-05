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
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/images/hero-visitation.webp"
          className="w-full h-64 sm:h-80 object-cover object-[center_35%] opacity-40"
        >
          <source src="/images/visitation-loop.mp4" type="video/mp4" />
        </video>
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

        {/* What it is — narrative intro */}
        <p className="mt-4 text-brand-700 text-lg">
          Supervised visitation gives parents time with their child in the presence of a trained, neutral monitor. The goal is simple: keep the child safe while maintaining the parent-child relationship.
        </p>

        {/* Who / Duration / Where — compact grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-xl bg-brand-50 p-5">
            <h2 className="text-sm font-semibold text-brand-900 uppercase tracking-wide">Who Needs It</h2>
            <p className="mt-2 text-sm text-brand-700">
              Families with a court order requiring supervision, or parents who agree to it for safety.
            </p>
          </div>
          <div className="rounded-xl bg-brand-50 p-5">
            <h2 className="text-sm font-semibold text-brand-900 uppercase tracking-wide">Duration</h2>
            <p className="mt-2 text-sm text-brand-700">
              2 hours minimum per visit. Most visits are 2-4 hours.
            </p>
          </div>
          <div className="rounded-xl bg-brand-50 p-5">
            <h2 className="text-sm font-semibold text-brand-900 uppercase tracking-wide">Location</h2>
            <p className="mt-2 text-sm text-brand-700">
              Parks, libraries, community centers, or the provider&apos;s office — agreed by both parties.
            </p>
          </div>
        </div>

        {/* What happens during a visit — image alongside copy */}
        <div className="mt-12 flex flex-col sm:flex-row gap-6 items-start">
          <div className="shrink-0 w-full sm:w-48 rounded-xl overflow-hidden shadow-sm">
            <video
              autoPlay
              loop
              muted
              playsInline
              poster="/images/reading-poster.webp"
              className="w-full h-36 sm:h-full object-cover object-[center_35%]"
            >
              <source src="/images/reading-loop.mp4" type="video/mp4" />
            </video>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-brand-900">What the Monitor Does</h2>
            <p className="mt-2 text-brand-700">
              Observes the visit, enforces the rules in your court order, keeps written documentation, and can provide reports to parents and courts. The monitor does not take sides. Their job is to keep the child safe while giving you meaningful time together.
            </p>
          </div>
        </div>

        {/* Documentation — image alongside copy */}
        <div className="mt-10 flex flex-col sm:flex-row-reverse gap-6 items-start">
          <div className="shrink-0 w-full sm:w-48">
            <Image
              src="/images/service-documentation.webp"
              alt="Professional writing on a court documentation clipboard"
              width={192}
              height={144}
              className="w-full rounded-xl shadow-sm"
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-brand-900">Reports &amp; Documentation</h2>
            <p className="mt-2 text-brand-700">
              After each visit, SafePair provides professional documentation. Reports go to parents and/or courts as needed. If testimony is requested, SafePair can appear as a witness.
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
              <span>Hourly rate (2-hr minimum)</span>
              <span className="font-semibold text-brand-900">{centsToUSD(hourly)}</span>
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

        {/* Compliance — trust pills inline */}
        <div className="mt-12 rounded-xl bg-brand-100 p-6">
          <h2 className="text-xl font-semibold text-brand-900 mb-3">California Standard 5.20 Compliant</h2>
          <p className="text-brand-700">
            Your monitor has passed a criminal background check, completed mandated training on child safety and domestic violence, and follows court-defined rules for neutrality, confidentiality, and documentation.
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
                href={`/counties/${county.slug}/supervised-visitation`}
                className="rounded-lg border border-brand-500/20 bg-white px-4 py-2 text-sm text-brand-700 hover:bg-brand-100 transition-colors"
              >
                {county.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Cross-links */}
        <div className="mt-10 flex flex-wrap gap-4 text-sm">
          <Link href="/services/supervised-exchange" className="text-accent-600 hover:text-accent-500 font-semibold">Supervised Exchange &rarr;</Link>
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
