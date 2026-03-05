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
  const siblingService = SERVICES.find((s) => s.slug !== service)!;

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
    {
      question: "Do I need a court order to start?",
      answer: "Not required to start intake. Most families have one. If unsure, consult your attorney.",
    },
    {
      question: isVisitation ? "How long are supervised visits?" : "Where do exchanges happen?",
      answer: isVisitation
        ? "Visits have a 2-hour minimum. Duration depends on your court order requirements and SafePair's professional assessment."
        : "Exchanges take place at a neutral, pre-arranged location agreed upon by both parents and SafePair. Common locations include public spaces, libraries, and community centers.",
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

      {/* Video hero */}
      <section className="relative bg-brand-900 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={isVisitation ? "/images/park-visit-2.webp" : "/images/exchange-school.webp"}
          className="w-full h-64 sm:h-80 object-cover object-[center_35%] opacity-40"
        >
          <source src={isVisitation ? "/images/visitation-loop.mp4" : "/images/exchange-loop.mp4"} type="video/mp4" />
        </video>
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
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-10">

              {/* Service overview — image + description */}
              <div className="rounded-xl border border-brand-500/20 bg-white shadow-sm overflow-hidden">
                <div className="flex flex-col sm:flex-row">
                  <div className="shrink-0 sm:w-48">
                    <Image
                      src={isVisitation ? "/images/father-son-library.webp" : "/images/exchange-school.webp"}
                      alt={isVisitation ? "Father and son reading during a supervised visit" : "Neutral monitor facilitating a custody exchange at school"}
                      width={192}
                      height={280}
                      className={`w-full h-44 sm:h-full object-cover ${isVisitation ? "object-[center_35%]" : "object-[center_40%]"}`}
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-brand-900 mb-3">What Is {serviceData.name}?</h2>
                    <p className="text-brand-700">
                      {isVisitation
                        ? "A trained, neutral professional monitor is present throughout a parent's time with their child. The monitor ensures the child's safety, follows court order requirements, and provides professional documentation of each session."
                        : "A trained, neutral professional facilitates the handoff of children between parents. The monitor ensures safe, structured transitions that reduce conflict and protect your child during custody exchanges."}
                    </p>
                    <Link href={`/services/${service}`} className="mt-3 inline-block text-sm font-semibold text-accent-600 hover:text-accent-500">
                      Learn more about {serviceData.name.toLowerCase()} &rarr;
                    </Link>
                  </div>
                </div>
              </div>

              {/* Starter price */}
              <div className="rounded-xl border border-brand-500/20 bg-white p-6 shadow-sm">
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
                <div className="mt-4 rounded-lg bg-accent-100 p-3 text-sm text-brand-900">
                  Payment does not guarantee provider acceptance. SafePair reviews every case independently.
                </div>
                <Link href="/pricing" className="mt-3 inline-block text-sm font-semibold text-accent-600 hover:text-accent-500">
                  See full pricing breakdown &rarr;
                </Link>
              </div>

              {/* Fit checklist — paired with image */}
              <div className="rounded-xl border border-brand-500/20 bg-white shadow-sm overflow-hidden">
                <div className="flex flex-col sm:flex-row">
                  <div className="shrink-0 sm:w-40">
                    <Image
                      src="/images/secure-entrance.webp"
                      alt="Secure entrance with family safety icon"
                      width={160}
                      height={320}
                      className="w-full h-40 sm:h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="text-lg font-semibold text-brand-900 mb-3">
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
                </div>
              </div>

              {/* Post-payment — with process image */}
              <div className="rounded-xl border border-brand-500/20 bg-white shadow-sm overflow-hidden">
                <div className="flex flex-col sm:flex-row-reverse">
                  <div className="shrink-0 sm:w-40">
                    <Image
                      src="/images/provider-review.webp"
                      alt="SafePair provider reviewing case documentation"
                      width={160}
                      height={320}
                      className="w-full h-40 sm:h-full object-cover object-[center_35%]"
                    />
                  </div>
                  <div className="p-6 flex-1">
                    <h2 className="text-lg font-semibold text-brand-900 mb-3">What Happens After Payment</h2>
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
                    <Link href="/how-it-works" className="mt-3 inline-block text-sm font-semibold text-accent-600 hover:text-accent-500">
                      See full 5-step process &rarr;
                    </Link>
                  </div>
                </div>
              </div>

              {/* Documents — paired with intake flatlay */}
              <div className="rounded-xl border border-brand-500/20 bg-white shadow-sm overflow-hidden">
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
                    <h2 className="text-lg font-semibold text-brand-900 mb-3">Documents to Prepare</h2>
                    <ul className="space-y-2 text-brand-700">
                      {[
                        "Valid government-issued photo ID",
                        "Court order or stipulation (if applicable)",
                        "Other parent's contact information",
                        "Preferred schedule and any date restrictions",
                        "Any restraining or no-contact orders",
                        "Names and ages of all children",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-accent-600 mt-0.5">&#10003;</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Standard 5.20 compliance */}
              <div className="rounded-xl bg-brand-100 p-6">
                <h2 className="text-lg font-semibold text-brand-900 mb-3">California Standard 5.20 Compliance</h2>
                <p className="text-brand-700 text-sm">
                  SafePair operates in compliance with California Family Code Section 3200.5 and California Rules of Court Standard 5.20. This means your monitor has passed a criminal background check, completed mandated training on child safety and domestic violence, and follows court-defined rules for neutrality, confidentiality, and documentation.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["Background Checks", "Certified Training", "Strict Confidentiality", "Neutral Supervision"].map((label) => (
                    <span key={label} className="rounded-full bg-white px-3 py-1 text-xs font-medium text-brand-700 shadow-sm">
                      {label}
                    </span>
                  ))}
                </div>
              </div>

              {/* FAQ */}
              <div>
                <h2 className="text-2xl font-semibold text-brand-900 mb-4">Frequently Asked Questions</h2>
                <FaqAccordion items={faqItems} />
              </div>

              {/* Cross-links: sibling service + counties */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={`/counties/${county}/${siblingService.slug}`}
                  className="flex-1 rounded-xl border border-brand-500/20 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
                >
                  <p className="text-sm text-brand-500 mb-1">Also available in {countyData.name}</p>
                  <h3 className="text-lg font-semibold text-brand-900">{siblingService.name}</h3>
                  <span className="mt-2 inline-block text-sm font-semibold text-accent-600">View details &rarr;</span>
                </Link>
                <Link
                  href={`/counties/${county}`}
                  className="flex-1 rounded-xl border border-brand-500/20 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
                >
                  <p className="text-sm text-brand-500 mb-1">Back to</p>
                  <h3 className="text-lg font-semibold text-brand-900">{countyData.name} Overview</h3>
                  <span className="mt-2 inline-block text-sm font-semibold text-accent-600">All services &rarr;</span>
                </Link>
              </div>

              {/* Sibling counties */}
              <div>
                <h2 className="text-lg font-semibold text-brand-900 mb-3">Also Serving</h2>
                <div className="flex flex-wrap gap-3">
                  {liveCounties.filter((c) => c.slug !== county).map((c) => (
                    <Link
                      key={c.slug}
                      href={`/counties/${c.slug}/${service}`}
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
              <div className="sticky top-24 space-y-6">
                <div className="rounded-xl border border-brand-500/20 bg-white p-6 shadow-sm">
                  <h3 className="text-xl font-semibold text-brand-900 mb-4">Quick Pricing</h3>
                  <ul className="space-y-3 text-brand-700">
                    <li className="flex justify-between">
                      <span>Intake (per person)</span>
                      <span className="font-semibold text-brand-900">{centsToUSD(starter.intake / 2)}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>{isVisitation ? "Per hour (2hr min)" : "Per exchange"}</span>
                      <span className="font-semibold text-brand-900">{centsToUSD(starter.service)}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Platform fee</span>
                      <span className="font-semibold text-brand-900">{centsToUSD(starter.platform)}</span>
                    </li>
                    <li className="flex justify-between border-t border-brand-500/20 pt-3">
                      <span className="font-semibold">Starter total</span>
                      <span className="font-bold text-accent-600">{centsToUSD(starter.total)}</span>
                    </li>
                  </ul>
                  <Link
                    href={`/start?county=${county}&service=${service}`}
                    className="mt-6 block w-full rounded-lg bg-accent-600 px-6 py-3 text-center text-base font-semibold text-white shadow-sm hover:bg-accent-500 transition-colors"
                  >
                    Start Intake
                  </Link>
                  <p className="mt-3 text-xs text-brand-500 text-center">
                    Response within 8 hours or by end of business day.
                  </p>
                </div>

                {/* Sidebar team image */}
                <div className="rounded-xl overflow-hidden shadow-sm">
                  <Image
                    src="/images/team-headshots.webp"
                    alt="SafePair supervised visitation providers"
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover object-[center_35%]"
                  />
                  <div className="bg-brand-50 p-4">
                    <p className="text-sm font-semibold text-brand-900">Your Provider Team</p>
                    <p className="text-xs text-brand-600 mt-1">Background-checked, certified, and committed to your child&apos;s safety.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
