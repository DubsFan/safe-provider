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

const COUNTY_IMAGES: Record<string, string> = {
  "santa-clara": "/images/father-son-library.webp",
  alameda: "/images/community-coloring.webp",
  "contra-costa": "/images/park-visit-1.webp",
  "san-francisco": "/images/virtual-visit-boy.webp",
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

      {/* Video hero */}
      <section className="relative bg-brand-900 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={COUNTY_IMAGES[county] ?? "/images/landing-hero.webp"}
          className="w-full h-64 sm:h-80 object-cover object-[center_35%] opacity-40"
        >
          <source src="/images/visitation-loop.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-white max-w-3xl mx-auto">
              Supervised Visitation and Exchange in {countyData.name}
            </h1>
            <p className="mt-4 text-lg text-gray-200 max-w-2xl mx-auto">
              Court-compliant intake for families in {countyData.name}. Standard 5.20 certified providers.
            </p>
          </div>
        </div>
      </section>

      <div className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="text-sm text-text-muted mb-8">
            <Link href="/" className="hover:text-text-body">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/counties" className="hover:text-text-body">Counties</Link>
            <span className="mx-2">/</span>
            <span className="text-text-heading">{countyData.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-10">

              {/* Courthouse info — paired with county image */}
              {details && (
                <div className="rounded-xl border border-border-default bg-surface-card shadow-sm overflow-hidden">
                  <div className="flex flex-col sm:flex-row">
                    <div className="shrink-0 sm:w-48">
                      <Image
                        src={COUNTY_IMAGES[county] ?? "/images/father-son-library.webp"}
                        alt={`Supervised visitation in ${countyData.name}`}
                        width={192}
                        height={280}
                        className="w-full h-44 sm:h-full object-cover object-[center_35%]"
                      />
                    </div>
                    <div className="p-6">
                      <h2 className="text-xl font-semibold text-text-heading mb-3">Courthouse Information</h2>
                      <p className="text-text-body"><strong>Court:</strong> {details.courthouse}</p>
                      <p className="text-text-body mt-1"><strong>Address:</strong> {details.address}</p>
                      {details.courtSource && (
                        <p className="text-text-body mt-1">
                          <strong>Source:</strong>{" "}
                          <a href={details.courtSource} target="_blank" rel="noopener noreferrer" className="text-accent-600 hover:text-accent-500">
                            Court provider list
                          </a>
                        </p>
                      )}
                      <p className="text-text-body mt-3 text-sm">{details.localNote}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Services — cards with images */}
              <div>
                <h2 className="text-2xl font-semibold text-text-heading mb-4">Available Services</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {SERVICES.map((service) => {
                    const isVis = service.slug === "supervised-visitation";
                    return (
                      <Link
                        key={service.slug}
                        href={`/counties/${county}/${service.slug}`}
                        className="rounded-xl border border-border-default bg-surface-card shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                      >
                        <Image
                          src={isVis ? "/images/father-son-library.webp" : "/images/exchange-school.webp"}
                          alt={isVis ? "Father and son during supervised visit" : "Neutral monitor facilitating custody exchange"}
                          width={400}
                          height={200}
                          className="w-full h-32 object-cover object-[center_35%]"
                        />
                        <div className="p-4">
                          <h3 className="text-lg font-semibold text-text-heading">{service.name}</h3>
                          <p className="mt-1 text-sm text-text-muted">
                            {isVis ? "Neutral monitoring during parent-child time" : "Structured, conflict-free custody handoffs"}
                          </p>
                          <span className="mt-2 inline-block text-sm font-semibold text-accent-600">
                            View details &rarr;
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* What to have ready — image paired with checklist */}
              <div className="rounded-xl border border-border-default bg-surface-card shadow-sm overflow-hidden">
                <div className="flex flex-col sm:flex-row">
                  <div className="shrink-0 sm:w-40">
                    <Image
                      src="/images/intake-flatlay.webp"
                      alt="Notebook, pen, and ID badge on a desk — ready for intake"
                      width={160}
                      height={240}
                      className="w-full h-40 sm:h-full object-cover object-[center_35%]"
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-text-heading mb-4">What to Have Ready</h2>
                    <ol className="space-y-2">
                      {CHECKLIST.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-text-body">
                          <span className="shrink-0 w-6 h-6 rounded-full bg-surface-muted text-text-heading flex items-center justify-center text-sm font-semibold">{i + 1}</span>
                          {item}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>

              {/* Compliance — with trust image */}
              <div className="rounded-xl border border-border-default bg-surface-card shadow-sm overflow-hidden">
                <div className="flex flex-col sm:flex-row-reverse">
                  <div className="shrink-0 sm:w-48">
                    <Image
                      src="/images/secure-entrance.webp"
                      alt="Secure entrance with family safety icon"
                      width={192}
                      height={280}
                      className="w-full h-44 sm:h-full object-cover object-[center_35%]"
                    />
                  </div>
                  <div className="p-6 flex-1">
                    <h2 className="text-xl font-semibold text-text-heading mb-3">Provider Compliance</h2>
                    <ul className="space-y-2">
                      {COMPLIANCE_BULLETS.map((bullet, i) => (
                        <li key={i} className="text-sm text-text-body">{bullet}</li>
                      ))}
                    </ul>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {["Background Checks", "Certified Training", "Strict Confidentiality", "Neutral Supervision", "Flexible Scheduling", "Court-Ready Docs"].map((label) => (
                        <span key={label} className="rounded-full bg-surface-muted px-3 py-1 text-xs font-medium text-text-body">
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Standard 5.20 */}
              <div className="rounded-xl bg-surface-muted p-6">
                <h2 className="text-xl font-semibold text-text-heading mb-3">What Does California Standard 5.20 Mean for You?</h2>
                <p className="text-text-body">
                  It means the person supervising your visit has passed a criminal background check, completed mandated training on child safety and domestic violence, and follows court-defined rules for neutrality, confidentiality, and documentation. It is the standard family courts use to verify provider qualifications.
                </p>
              </div>

              {/* FAQ */}
              <div>
                <h2 className="text-2xl font-semibold text-text-heading mb-4">Frequently Asked Questions</h2>
                <FaqAccordion items={faqItems} />
              </div>

              {/* Sibling counties */}
              <div>
                <h2 className="text-xl font-semibold text-text-heading mb-4">Also Serving</h2>
                <div className="flex flex-wrap gap-3">
                  {liveCounties.filter((c) => c.slug !== county).map((c) => (
                    <Link
                      key={c.slug}
                      href={`/counties/${c.slug}`}
                      className="rounded-lg border border-border-default bg-surface-card px-4 py-2 text-sm text-text-body hover:bg-surface-muted transition-colors"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Pricing sidebar */}
            <div>
              <div className="sticky top-24 space-y-6">
                <div className="rounded-xl border border-border-default bg-surface-card p-6 shadow-sm">
                  <h3 className="text-xl font-semibold text-text-heading mb-4">Pricing</h3>
                  <ul className="space-y-3 text-text-body">
                    <li className="flex justify-between">
                      <span>Intake (per person)</span>
                      <span className="font-semibold text-text-heading">
                        {centsToUSD(rates[0]?.intake_per_adult_cents ?? FALLBACK_RATES.intake_per_adult_cents)}
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span>Hourly rate</span>
                      <span className="font-semibold text-text-heading">
                        {centsToUSD(rates[0]?.hourly_rate_cents ?? FALLBACK_RATES.hourly_rate_cents)}
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span>Exchange fee</span>
                      <span className="font-semibold text-text-heading">
                        {centsToUSD(rates[0]?.exchange_fee_cents ?? FALLBACK_RATES.exchange_fee_cents)}
                      </span>
                    </li>
                    <li className="flex justify-between border-t border-border-default pt-3">
                      <span>Platform fee</span>
                      <span className="font-semibold text-text-heading">
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
                  <p className="mt-3 text-xs text-text-muted text-center">
                    Response within 8 hours or by end of business day.
                  </p>
                </div>

                {/* Team headshots in sidebar */}
                <div className="rounded-xl overflow-hidden shadow-sm">
                  <Image
                    src="/images/team-headshots.webp"
                    alt="SafePair supervised visitation providers"
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover object-[center_35%]"
                  />
                  <div className="bg-surface-subtle p-4">
                    <p className="text-sm font-semibold text-text-heading">Your Provider Team</p>
                    <p className="text-xs text-text-muted mt-1">Background-checked, certified, and committed to your child&apos;s safety.</p>
                  </div>
                </div>

                {/* Quick links */}
                <div className="rounded-xl border border-border-default bg-surface-card p-5 shadow-sm">
                  <h3 className="text-sm font-semibold text-text-heading mb-3">Quick Links</h3>
                  <ul className="space-y-2 text-sm">
                    <li><Link href="/pricing" className="text-accent-600 hover:text-accent-500">Full pricing breakdown &rarr;</Link></li>
                    <li><Link href="/how-it-works" className="text-accent-600 hover:text-accent-500">5-step process &rarr;</Link></li>
                    <li><Link href="/faq" className="text-accent-600 hover:text-accent-500">FAQ &rarr;</Link></li>
                    <li><Link href="/for-attorneys" className="text-accent-600 hover:text-accent-500">For attorneys &rarr;</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
