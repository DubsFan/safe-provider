import Link from "next/link";
import Image from "next/image";
import { buildMetadata } from "@/lib/seo/metadata";
import { COUNTIES } from "@/lib/site-config";

export const metadata = buildMetadata({
  title: "Supervised Visitation by County — Bay Area",
  description: "Find supervised visitation and custody exchange in Santa Clara, Alameda, Contra Costa, or San Francisco County. Court-compliant intake with transparent pricing.",
  path: "/counties",
});

const liveCounties = COUNTIES.filter((c) => c.status === "live");

export default function CountiesPage() {
  return (
    <>
      {/* Hero banner */}
      <section className="relative bg-brand-900 overflow-hidden">
        <Image
          src="/images/landing-hero-alt1.webp"
          alt="Supervised visitation session and diverse families served across Bay Area counties"
          width={1400}
          height={500}
          className="w-full h-64 sm:h-72 object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-white max-w-3xl mx-auto">Counties We Serve</h1>
            <p className="mt-4 text-lg text-gray-200 max-w-2xl mx-auto">
              Court-compliant supervised visitation and exchange in the Bay Area.
            </p>
          </div>
        </div>
      </section>

    <div className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <p className="mt-8 text-brand-700 text-center max-w-3xl mx-auto">
          SafePair currently serves families in four Bay Area counties. Each county has its own family court system, and your court order specifies which county has jurisdiction. Select your county below to see local details, pricing, and how to start intake.
        </p>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {liveCounties.map((county) => (
            <Link
              key={county.slug}
              href={`/counties/${county.slug}`}
              className="rounded-xl border border-brand-500/20 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <h2 className="text-xl font-semibold text-brand-900">{county.name}</h2>
              <p className="mt-2 text-sm text-brand-700">
                Supervised visitation and supervised exchange services available.
              </p>
              <span className="mt-4 inline-block text-sm font-semibold text-accent-600">
                View details &rarr;
              </span>
            </Link>
          ))}
        </div>

        {/* Why your county matters — image integrated with copy */}
        <div className="mt-16 max-w-3xl mx-auto flex flex-col sm:flex-row gap-6 items-start">
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
            <h2 className="text-2xl font-semibold text-brand-900 mb-3">Why Your County Matters</h2>
            <p className="text-brand-700">
              Each county has its own family court and requirements for supervised visitation providers.
              SafePair is familiar with local court procedures and can help ensure your visits are
              compliant with your county&apos;s requirements.
            </p>
          </div>
        </div>

        {/* What visits look like — two families, two settings */}
        <div className="mt-12 max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold text-brand-900 text-center mb-6">What Visits Look Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="rounded-xl overflow-hidden shadow-sm border border-brand-500/10">
              <Image
                src="/images/community-coloring.webp"
                alt="Parent and child coloring together at a community center table"
                width={400}
                height={200}
                className="w-full h-36 object-cover"
              />
              <p className="p-4 text-sm text-brand-700">Coloring and drawing at a community center — a calm, structured activity led by the parent with a monitor present.</p>
            </div>
            <div className="rounded-xl overflow-hidden shadow-sm border border-brand-500/10">
              <Image
                src="/images/park-visit-2.webp"
                alt="Father and son drawing together at an outdoor park table"
                width={400}
                height={200}
                className="w-full h-36 object-cover"
              />
              <p className="p-4 text-sm text-brand-700">Drawing together at a park — outdoor visits give families space to connect naturally while the monitor observes.</p>
            </div>
          </div>
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
            Get an intake response within 8 hours or by the end of the business day.
          </p>
        </div>
      </div>
    </div>
    </>
  );
}
