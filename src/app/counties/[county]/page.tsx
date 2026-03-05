import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, faqSchema } from "@/lib/seo/schemas";
import { COUNTIES, SERVICES, SITE_URL, FALLBACK_RATES } from "@/lib/site-config";
import { getRatesForCounty, centsToUSD } from "@/lib/supabase/rate-cards";
import { FaqAccordion } from "@/components/ui/FaqAccordion";

const liveCounties = COUNTIES.filter((c) => c.status === "live");

const COUNTY_DETAILS: Record<string, { courthouse: string; address: string; courtSource?: string; localNote: string }> = {
  "santa-clara": {
    courthouse: "Santa Clara County Family Court Center",
    address: "201 N First Street, San Jose, CA 95113",
    courtSource: "https://santaclara.courts.ca.gov/system/files/family/svp_sccounty.pdf",
    localNote: "SafePair is listed as a provider for Santa Clara County on the court's official supervised visitation provider list.",
  },
  alameda: {
    courthouse: "Alameda County Superior Court, Family Law Division",
    address: "1221 Oak Street, Oakland, CA 94612",
    localNote: "SafePair serves families in Alameda County for supervised visitation and custody exchange.",
  },
  "contra-costa": {
    courthouse: "Contra Costa County Superior Court",
    address: "751 Pine Street, Martinez, CA 94553",
    localNote: "SafePair serves families in Contra Costa County for supervised visitation and custody exchange.",
  },
  "san-francisco": {
    courthouse: "San Francisco Superior Court, Unified Family Court",
    address: "400 McAllister Street, San Francisco, CA 94102",
    localNote: "SafePair serves families in San Francisco County for supervised visitation and custody exchange.",
  },
};

const CHECKLIST = [
  "A valid government-issued photo ID for each adult",
  "Your court order or stipulation (if you have one)",
  "The other parent's full name and contact information",
  "Your preferred schedule and any date restrictions",
  "Any restraining orders or no-contact orders that apply",
  "Names and ages of all children involved",
];

const COMPLIANCE_BULLETS = [
  "SafePair operates in compliance with California Family Code Section 3200.5 and California Rules of Court Standard 5.20.",
  "Standard 5.20 requires professional providers to complete a Live Scan criminal background check before providing services.",
  "Standard 5.20 requires professional providers to complete 24 hours of training, including at least 12 hours of classroom instruction covering child abuse reporting, documentation, developmental needs, and domestic violence.",
  "SafePair is listed on the Santa Clara County Superior Court supervised visitation provider list (revised February 3, 2026).",
];

export function generateStaticParams() {
  return liveCounties.map((c) => ({ county: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ county: string }> }) {
  const { county } = await params;
  const countyData = liveCounties.find((c) => c.slug === county);
  if (!countyData) return {};
  return buildMetadata({
    title: `Supervised Visitation in ${countyData.name} — Court-Compliant Intake`,
    description: `Professional supervised visitation and custody exchange in ${countyData.name}. Standard 5.20 compliant. Online intake, transparent pricing, 8-hour response.`,
    path: `/counties/${county}`,
  });
}

export default async function CountyPage({ params }: { params: Promise<{ county: string }> }) {
  const { county } = await params;
  const countyData = liveCounties.find((c) => c.slug === county);
  if (!countyData) notFound();

  const details = COUNTY_DETAILS[county];
  const rates = await getRatesForCounty(county);

  const faqItems = [
    { question: `How much does supervised visitation cost in ${countyData.name}?`, answer: "Intake is $50 per person. Supervised visitation is $70 per hour with a 2-hour minimum. A platform scheduling fee of $99 applies to each case booked through SafeProvider. For a typical first visit with two parents and one child, the total is $339." },
    { question: `How do I start supervised visitation in ${countyData.name}?`, answer: "Complete our online intake form, pay securely, and SafePair will review your case within 1-2 business days. Total time from payment to first session is typically 3-7 business days." },
    { question: `Does SafePair serve ${countyData.name}?`, answer: `Yes. ${details?.localNote ?? "SafePair serves families in this county for supervised visitation and custody exchange."}` },
    { question: "What happens after I pay?", answer: "Payment reserves your intake slot and triggers case review. SafePair reviews independently. If accepted, they contact you to schedule. If declined, full refund." },
    { question: "Do I need a court order?", answer: "Not required to start intake. Most families have one. If unsure, consult your attorney." },
  ];

  const breadcrumbs = [
    { name: "Home", url: SITE_URL },
    { name: "Counties", url: `${SITE_URL}/counties` },
    { name: countyData.name, url: `${SITE_URL}/counties/${county}` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbSchema(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqSchema(faqItems) }}
      />

      {/* Hero banner */}
      <section className="relative bg-brand-900 overflow-hidden">
        <Image
          src="/images/father-son-library.webp"
          alt={`Father and son reading together during a supervised visit in ${countyData.name}`}
          width={2400}
          height={1792}
          className="w-full h-64 sm:h-80 object-cover object-[center_25%] opacity-40"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-white max-w-3xl mx-auto">
              Supervised Visitation and Exchange in {countyData.name}
            </h1>
            <p className="mt-4 text-lg text-gray-200 max-w-2xl mx-auto">
              Court-compliant intake for families in {countyData.name}.
            </p>
          </div>
        </div>
      </section>

      <div className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="text-sm text-brand-500 mb-8">
            <Link href="/" className="hover:text-brand-700">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/counties" className="hover:text-brand-700">Counties</Link>
            <span className="mx-2">/</span>
            <span className="text-brand-900">{countyData.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2">

              {details && (
                <div className="mt-8 rounded-xl border border-brand-500/20 bg-white p-6 shadow-sm">
                  <h2 className="text-xl font-semibold text-brand-900 mb-4">Courthouse Information</h2>
                  <p className="text-brand-700"><strong>Court:</strong> {details.courthouse}</p>
                  <p className="text-brand-700 mt-1"><strong>Address:</strong> {details.address}</p>
                  {details.courtSource && (
                    <p className="text-brand-700 mt-1">
                      <strong>Source:</strong>{" "}
                      <a href={details.courtSource} target="_blank" rel="noopener noreferrer" className="text-accent-600 hover:text-accent-500">
                        Court provider list
                      </a>
                    </p>
                  )}
                  <p className="text-brand-700 mt-3 text-sm">{details.localNote}</p>
                </div>
              )}

              {/* Services */}
              <div className="mt-8">
                <h2 className="text-2xl font-semibold text-brand-900 mb-4">Available Services</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {SERVICES.map((service) => (
                    <Link
                      key={service.slug}
                      href={`/counties/${county}/${service.slug}`}
                      className="rounded-xl border border-brand-500/20 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <h3 className="text-lg font-semibold text-brand-900">{service.name}</h3>
                      <span className="mt-2 inline-block text-sm font-semibold text-accent-600">
                        View details &rarr;
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* What to have ready — image paired with checklist */}
              <div className="mt-8 rounded-xl border border-brand-500/20 bg-white shadow-sm overflow-hidden">
                <div className="flex flex-col sm:flex-row">
                  <div className="shrink-0 sm:w-40">
                    <Image
                      src="/images/intake-flatlay.webp"
                      alt="Notebook, pen, and ID badge on a desk — ready for intake"
                      width={160}
                      height={240}
                      className="w-full h-40 sm:h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-brand-900 mb-4">What to Have Ready</h2>
                    <ol className="space-y-2">
                      {CHECKLIST.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-brand-700">
                          <span className="shrink-0 w-6 h-6 rounded-full bg-brand-100 text-brand-900 flex items-center justify-center text-sm font-semibold">{i + 1}</span>
                          {item}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>

              {/* Compliance — text pills instead of dumped image */}
              <div className="mt-8 rounded-xl bg-brand-100 p-6">
                <h2 className="text-xl font-semibold text-brand-900 mb-3">Provider Compliance</h2>
                <ul className="space-y-2">
                  {COMPLIANCE_BULLETS.map((bullet, i) => (
                    <li key={i} className="text-sm text-brand-700">{bullet}</li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["Background Checks", "Certified Training", "Strict Confidentiality", "Neutral Supervision", "Flexible Scheduling", "Court-Ready Docs"].map((label) => (
                    <span key={label} className="rounded-full bg-white px-3 py-1 text-xs font-medium text-brand-700 shadow-sm">
                      {label}
                    </span>
                  ))}
                </div>
              </div>

              {/* Standard 5.20 */}
              <div className="mt-8 rounded-xl bg-brand-100 p-6">
                <h2 className="text-xl font-semibold text-brand-900 mb-3">What Does California Standard 5.20 Mean for You?</h2>
                <p className="text-brand-700">
                  It means the person supervising your visit has passed a criminal background check, completed mandated training on child safety and domestic violence, and follows court-defined rules for neutrality, confidentiality, and documentation. It is the standard family courts use to verify provider qualifications.
                </p>
              </div>

              {/* FAQ */}
              <div className="mt-12">
                <h2 className="text-2xl font-semibold text-brand-900 mb-4">FAQ</h2>
                <FaqAccordion items={faqItems} />
              </div>

              {/* Sibling counties */}
              <div className="mt-12">
                <h2 className="text-xl font-semibold text-brand-900 mb-4">Also Serving</h2>
                <div className="flex flex-wrap gap-3">
                  {liveCounties.filter((c) => c.slug !== county).map((c) => (
                    <Link
                      key={c.slug}
                      href={`/counties/${c.slug}`}
                      className="rounded-lg border border-brand-500/20 bg-white px-4 py-2 text-sm text-brand-700 hover:bg-brand-100 transition-colors"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Pricing sidebar */}
            <div>
              <div className="sticky top-24 rounded-xl border border-brand-500/20 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-brand-900 mb-4">Pricing</h3>
                <ul className="space-y-3 text-brand-700">
                  <li className="flex justify-between">
                    <span>Intake (per person)</span>
                    <span className="font-semibold text-brand-900">
                      {centsToUSD(rates[0]?.intake_per_adult_cents ?? FALLBACK_RATES.intake_per_adult_cents)}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span>Hourly rate</span>
                    <span className="font-semibold text-brand-900">
                      {centsToUSD(rates[0]?.hourly_rate_cents ?? FALLBACK_RATES.hourly_rate_cents)}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span>Exchange fee</span>
                    <span className="font-semibold text-brand-900">
                      {centsToUSD(rates[0]?.exchange_fee_cents ?? FALLBACK_RATES.exchange_fee_cents)}
                    </span>
                  </li>
                  <li className="flex justify-between border-t border-brand-500/20 pt-3">
                    <span>Platform fee</span>
                    <span className="font-semibold text-brand-900">
                      {centsToUSD(rates[0]?.platform_fee_cents ?? FALLBACK_RATES.platform_fee_cents)}
                    </span>
                  </li>
                </ul>
                <Link
                  href={`/start?county=${county}`}
                  className="mt-6 block w-full rounded-lg bg-accent-600 px-6 py-3 text-center text-base font-semibold text-white shadow-sm hover:bg-accent-500 transition-colors"
                >
                  Start Intake for {countyData.name}
                </Link>
                <p className="mt-3 text-xs text-brand-500 text-center">
                  Get an intake response within 8 hours or by the end of the business day.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
