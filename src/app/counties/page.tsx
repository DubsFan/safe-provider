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

const COUNTY_IMAGES: Record<string, { src: string; alt: string }> = {
  "santa-clara": { src: "/images/father-son-library.webp", alt: "Father and son reading together at a library in Santa Clara County" },
  alameda: { src: "/images/community-coloring.webp", alt: "Parent and child coloring at a community center in Alameda County" },
  "contra-costa": { src: "/images/park-visit-1.webp", alt: "Father and daughter drawing at a park in Contra Costa County" },
  "san-francisco": { src: "/images/virtual-visit-boy.webp", alt: "Boy on a supervised virtual visit in San Francisco County" },
};

export default function CountiesPage() {
  return (
    <>
      {/* Hero banner — father-daughter video */}
      <section className="relative bg-brand-900 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/images/handoff-poster.webp"
          className="w-full h-64 sm:h-80 object-cover object-[center_25%] opacity-40"
        >
          <source src="/images/handoff-loop.mp4" type="video/mp4" />
        </video>
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
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

          {/* Intro copy */}
          <p className="text-brand-700 text-center max-w-3xl mx-auto mb-12">
            SafePair currently serves families in four Bay Area counties. Each county has its own family court system,
            and your court order specifies which county has jurisdiction. Select your county below to see local details,
            pricing, and how to start intake.
          </p>

          {/* County cards with images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {liveCounties.map((county) => {
              const img = COUNTY_IMAGES[county.slug];
              return (
                <Link
                  key={county.slug}
                  href={`/counties/${county.slug}`}
                  className="group rounded-xl border border-brand-500/20 bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                >
                  {img && (
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={600}
                      height={300}
                      className="w-full h-40 object-cover object-[center_35%] group-hover:scale-[1.02] transition-transform duration-300"
                    />
                  )}
                  <div className="p-5">
                    <h2 className="text-lg font-semibold text-brand-900">{county.name}</h2>
                    <p className="mt-1 text-sm text-brand-600">Supervised visitation &amp; custody exchange</p>
                    <span className="mt-3 inline-block text-sm font-semibold text-accent-600 group-hover:text-accent-500">
                      View details &rarr;
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* What to expect — paired image + copy */}
          <div className="mt-16 rounded-xl border border-brand-500/20 bg-white shadow-sm overflow-hidden">
            <div className="flex flex-col sm:flex-row">
              <div className="shrink-0 sm:w-56">
                <Image
                  src="/images/intake-flatlay.webp"
                  alt="Notebook, pen, and ID badge on a desk — ready for intake"
                  width={224}
                  height={300}
                  className="w-full h-44 sm:h-full object-cover object-[center_35%]"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-brand-900 mb-3">What to Expect</h2>
                <ol className="space-y-2 text-sm text-brand-700">
                  <li className="flex items-start gap-3">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-accent-600 text-white flex items-center justify-center text-xs font-bold">1</span>
                    Select your county and complete the 5-minute intake form
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-accent-600 text-white flex items-center justify-center text-xs font-bold">2</span>
                    Pay securely — see your total before you pay
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-accent-600 text-white flex items-center justify-center text-xs font-bold">3</span>
                    SafePair reviews your case within 1-2 business days
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-accent-600 text-white flex items-center justify-center text-xs font-bold">4</span>
                    Once accepted, scheduling begins — typically 3-7 days total
                  </li>
                </ol>
              </div>
            </div>
          </div>

          {/* Compliance + documentation */}
          <div className="mt-12 flex flex-col sm:flex-row gap-6">
            <div className="flex-1 rounded-xl bg-brand-100 p-6">
              <Image
                src="/images/trust-compliance.webp"
                alt="Four compliance pillars: background checks, training, confidentiality, neutral supervision"
                width={400}
                height={300}
                className="w-full rounded-lg mb-4"
              />
              <h3 className="text-base font-semibold text-brand-900 mb-2">Standard 5.20 Compliant</h3>
              <p className="text-sm text-brand-700">
                Every provider passes background checks, completes mandated training, and follows court rules for neutrality and documentation.
              </p>
            </div>
            <div className="flex-1 rounded-xl border border-brand-500/20 bg-white p-6 shadow-sm">
              <Image
                src="/images/service-documentation.webp"
                alt="Professional writing on a court documentation clipboard"
                width={400}
                height={300}
                className="w-full rounded-lg mb-4"
              />
              <h3 className="text-base font-semibold text-brand-900 mb-2">Court-Ready Documentation</h3>
              <p className="text-sm text-brand-700">
                Written reports after each session. Available to parents and courts. Testimony when requested.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
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
