import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, faqSchema } from "@/lib/seo/schemas";
import { COUNTIES, SERVICES, SITE_URL } from "@/lib/site-config";
import { getRateForCountyService, calcStarterPrice, centsToUSD } from "@/lib/supabase/rate-cards";
import { FaqAccordion } from "@/components/ui/FaqAccordion";

const liveCounties = COUNTIES.filter((c) => c.status === "live");

export function generateStaticParams() {
  const params: { county: string; service: string }[] = [];
  for (const county of liveCounties) {
    for (const service of SERVICES) {
      params.push({ county: county.slug, service: service.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ county: string; service: string }> }) {
  const { county, service } = await params;
  const countyData = liveCounties.find((c) => c.slug === county);
  const serviceData = SERVICES.find((s) => s.slug === service);
  if (!countyData || !serviceData) return {};
  return buildMetadata({
    title: `${serviceData.name} in ${countyData.name} — Pricing & Online Intake`,
    description: service === "supervised-visitation"
      ? `Supervised visitation in ${countyData.name} from $70/hour. Neutral professional monitoring, court-ready documentation. Start intake online.`
      : `Supervised custody exchange in ${countyData.name}. $70 per exchange. Structured handoffs with a neutral monitor. Start intake online.`,
    path: `/counties/${county}/${service}`,
  });
}

export default async function CountyServicePage({ params }: { params: Promise<{ county: string; service: string }> }) {
  const { county, service } = await params;
  const countyData = liveCounties.find((c) => c.slug === county);
  const serviceData = SERVICES.find((s) => s.slug === service);
  if (!countyData || !serviceData) notFound();

  const rate = await getRateForCountyService(county, service);
  const starter = calcStarterPrice(rate, 2, service);

  const isVisitation = service === "supervised-visitation";

  const faqItems = [
    {
      question: `How much does ${serviceData.name.toLowerCase()} cost in ${countyData.name}?`,
      answer: isVisitation
        ? "Intake is $50 per person. Supervised visitation is $70 per hour with a 2-hour minimum. A platform scheduling fee of $99 applies to each case booked through this site."
        : "Intake is $50 per person. Each supervised exchange is $70. A platform scheduling fee of $99 applies to each case booked through this site.",
    },
    {
      question: "What documents do I need?",
      answer: "Have ready: a valid government-issued photo ID, your court order or stipulation (if applicable), the other parent's contact information, and your preferred schedule.",
    },
    {
      question: "What happens after I pay?",
      answer: "Payment reserves your intake slot. SafePair reviews your case independently. If accepted, they will contact you to schedule. If declined, you receive a full refund.",
    },
  ];

  const breadcrumbs = [
    { name: "Home", url: SITE_URL },
    { name: "Counties", url: `${SITE_URL}/counties` },
    { name: countyData.name, url: `${SITE_URL}/counties/${county}` },
    { name: serviceData.name, url: `${SITE_URL}/counties/${county}/${service}` },
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
          src={isVisitation ? "/images/hero-visitation.webp" : "/images/hero-exchange.webp"}
          alt={`${serviceData.name} in ${countyData.name}`}
          width={1400}
          height={500}
          className="w-full h-64 sm:h-80 object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-white max-w-3xl mx-auto">
              {serviceData.name} in {countyData.name}
            </h1>
            <p className="mt-4 text-lg text-gray-200 max-w-2xl mx-auto">
              {isVisitation
                ? "A trained, neutral third-party monitor is present during a parent's time with their child."
                : "A trained, neutral third-party facilitates the handoff of children between parents."}
            </p>
          </div>
        </div>
      </section>

      <div className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="text-sm text-brand-500 mb-8">
            <Link href="/" className="hover:text-brand-700">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/counties" className="hover:text-brand-700">Counties</Link>
            <span className="mx-2">/</span>
            <Link href={`/counties/${county}`} className="hover:text-brand-700">{countyData.name}</Link>
            <span className="mx-2">/</span>
            <span className="text-brand-900">{serviceData.name}</span>
          </nav>

          {/* Starter price */}
          <div className="mt-8 rounded-xl border border-brand-500/20 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-brand-900 mb-4">
              Starter Package (2 adults)
            </h2>
            <ul className="space-y-2 text-brand-700">
              <li className="flex justify-between">
                <span>2-person intake ({centsToUSD(starter.intake / 2)} x 2)</span>
                <span className="font-semibold text-brand-900">{centsToUSD(starter.intake)}</span>
              </li>
              <li className="flex justify-between">
                <span>{isVisitation ? "First visit, 2 hours" : "First exchange"}</span>
                <span className="font-semibold text-brand-900">{centsToUSD(starter.service)}</span>
              </li>
              <li className="flex justify-between">
                <span>Platform fee</span>
                <span className="font-semibold text-brand-900">{centsToUSD(starter.platform)}</span>
              </li>
              <li className="flex justify-between border-t border-brand-500/20 pt-2">
                <span className="font-semibold">Total</span>
                <span className="font-bold text-brand-900">{centsToUSD(starter.total)}</span>
              </li>
            </ul>
          </div>

          {/* Payment alert */}
          <div className="mt-6 rounded-lg bg-accent-100 p-4 text-sm text-brand-900">
            Payment does not guarantee provider acceptance. SafePair reviews every case independently.
          </div>

          {/* Fit checklist */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-brand-900 mb-4">
              {isVisitation ? "Is Supervised Visitation Right for You?" : "Is Supervised Exchange Right for You?"}
            </h2>
            <ul className="space-y-2 text-brand-700">
              {(isVisitation
                ? [
                    "Your court order requires supervised visitation",
                    "You and the other parent agree that supervision is needed for safety",
                    "There are concerns about child safety during unsupervised contact",
                    "You need professional documentation of visits for your case",
                    "Your case involves domestic violence, substance abuse, or other safety concerns",
                  ]
                : [
                    "Your court order requires supervised custody exchanges",
                    "Direct contact between parents during handoffs causes conflict",
                    "There is a restraining order or no-contact order between parents",
                    "You want a neutral witness to document each exchange",
                    "You need structured transitions to reduce stress for your child",
                  ]
              ).map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="shrink-0 mt-1 w-4 h-4 rounded-full bg-accent-100 flex items-center justify-center text-xs text-accent-700">{"\u2713"}</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Post-payment process */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-brand-900 mb-4">What Happens After Payment</h2>
            <ol className="space-y-3 text-brand-700">
              {[
                "SafePair reviews your case within 1-2 business days",
                "If accepted, SafePair contacts you to confirm scheduling details",
                "Your first session is scheduled at a mutually agreed location",
                "After the session, documentation is provided per your court order requirements",
              ].map((s, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-brand-100 text-brand-900 flex items-center justify-center text-sm font-semibold">{i + 1}</span>
                  {s}
                </li>
              ))}
            </ol>
          </div>

          {/* Service image */}
          <div className="mt-8">
            <Image
              src={isVisitation ? "/images/hero-visitation.webp" : "/images/hero-exchange.webp"}
              alt={isVisitation ? "Parent and child during a supervised visitation session" : "Neutral monitor facilitating a supervised custody exchange"}
              width={1000}
              height={400}
              className="w-full rounded-xl shadow-sm"
            />
          </div>

          {/* Documents needed */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-brand-900 mb-4">Documents to Prepare</h2>
            <ul className="list-disc list-inside space-y-2 text-brand-700">
              <li>Valid government-issued photo ID</li>
              <li>Court order or stipulation (if applicable)</li>
              <li>Other parent&apos;s contact information</li>
              <li>Preferred schedule</li>
            </ul>
          </div>

          {/* FAQ */}
          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-brand-900 mb-4">FAQ</h2>
            <FaqAccordion items={faqItems} />
          </div>

          {/* CTA */}
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
