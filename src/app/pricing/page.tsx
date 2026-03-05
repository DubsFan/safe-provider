import Link from "next/link";
import Image from "next/image";
import { buildMetadata } from "@/lib/seo/metadata";
import { PricingTable } from "@/components/ui/PricingTable";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { faqSchema } from "@/lib/seo/schemas";

export const metadata = buildMetadata({
  title: "Supervised Visitation Cost — Transparent Pricing",
  description: "Supervised visitation from $70/hour, exchange $70, intake $50/person. See your total before you pay. Sliding scale available. No hidden fees.",
  path: "/pricing",
});

const PRICING_FAQ = [
  { question: "How much does supervised visitation cost?", answer: "Intake is $50 per person. Supervised visitation is $70 per hour with a 2-hour minimum. A platform scheduling fee of $99 applies to each case booked through SafeProvider. For a typical first visit with two parents and one child, the total is $339. See our pricing page for full details." },
  { question: "How much does supervised exchange cost?", answer: "Intake is $50 per person. Each supervised exchange is $70. A platform scheduling fee of $99 applies. For a typical first exchange with two parents, the total is $269." },
  { question: "Are there additional fees for more children?", answer: "SafePair charges a flat $50 per additional child. This is not per hour. Ask during intake for exact pricing for your family." },
  { question: "Is there a sliding scale or low-income option?", answer: "Yes. SafePair offers sliding-scale rates for qualifying families. Ask about eligibility during intake." },
  { question: "Where does the $99 platform fee go?", answer: "The $99 SafeProvider platform fee covers intake processing, scheduling coordination, secure payment handling, and case tracking. It is separate from SafePair's provider fees." },
];

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqSchema(PRICING_FAQ) }}
      />

      {/* Hero banner — clipboard video */}
      <section className="relative bg-brand-900 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/images/intake-poster.webp"
          className="w-full h-64 sm:h-80 object-cover object-[center_35%] opacity-40"
        >
          <source src="/images/intake-loop.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-white max-w-3xl mx-auto">Simple, Transparent Pricing</h1>
            <p className="mt-4 text-lg text-gray-200 max-w-2xl mx-auto">
              Know your total cost before your first visit. No hidden fees.
            </p>
          </div>
        </div>
      </section>

      <div className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mt-4 text-brand-700 text-center max-w-3xl mx-auto">
            All provider rates are set by SafePair and listed on the Santa Clara County court provider list. The SafeProvider platform fee of $99 covers intake processing, scheduling coordination, and payment handling.
          </p>

          <div className="mt-12">
            <PricingTable />
          </div>

          {/* Additional details */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-lg bg-brand-100 p-4 text-center">
              <p className="text-sm font-semibold text-brand-900">Additional Child</p>
              <p className="text-sm text-brand-700">$50 flat (not per hour)</p>
            </div>
            <div className="rounded-lg bg-brand-100 p-4 text-center">
              <p className="text-sm font-semibold text-brand-900">Sliding Scale</p>
              <p className="text-sm text-brand-700">Yes — ask during intake</p>
            </div>
            <div className="rounded-lg bg-brand-100 p-4 text-center">
              <p className="text-sm font-semibold text-brand-900">Hours</p>
              <p className="text-sm text-brand-700">Mon-Fri 9-5, Sat-Sun 9-7</p>
            </div>
            <div className="rounded-lg bg-brand-100 p-4 text-center">
              <p className="text-sm font-semibold text-brand-900">Typical Visit</p>
              <p className="text-sm text-brand-700">2-4 hours</p>
            </div>
          </div>

          {/* What your fee covers — bold image cards */}
          <div className="mt-16 max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-brand-900 text-center mb-8">What Your Fee Covers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="rounded-xl border border-brand-500/20 bg-white shadow-sm overflow-hidden">
                <Image
                  src="/images/service-visitation.webp"
                  alt="Father and daughter reading together at a library table during a supervised visit"
                  width={400}
                  height={200}
                  className="w-full h-40 object-cover object-[center_35%]"
                />
                <div className="p-5">
                  <h3 className="text-base font-semibold text-brand-900">Neutral Professional Monitoring</h3>
                  <p className="mt-2 text-sm text-brand-700">A trained monitor present during every minute of your visit, focused on your child&apos;s safety.</p>
                </div>
              </div>
              <div className="rounded-xl border border-brand-500/20 bg-white shadow-sm overflow-hidden">
                <Image
                  src="/images/service-documentation.webp"
                  alt="Professional writing visit notes on a court documentation clipboard"
                  width={400}
                  height={200}
                  className="w-full h-40 object-cover object-[center_35%]"
                />
                <div className="p-5">
                  <h3 className="text-base font-semibold text-brand-900">Court-Ready Documentation</h3>
                  <p className="mt-2 text-sm text-brand-700">Written reports after each session, available to parents and courts. Testimony when requested.</p>
                </div>
              </div>
              <div className="rounded-xl border border-brand-500/20 bg-white shadow-sm overflow-hidden">
                <Image
                  src="/images/park-visit-2.webp"
                  alt="Father and son drawing together at an outdoor park table"
                  width={400}
                  height={200}
                  className="w-full h-40 object-cover object-[center_35%]"
                />
                <div className="p-5">
                  <h3 className="text-base font-semibold text-brand-900">Child-Centered Structure</h3>
                  <p className="mt-2 text-sm text-brand-700">Safe, calm environment designed to protect the child and reduce conflict between parents.</p>
                </div>
              </div>
              <div className="rounded-xl border border-brand-500/20 bg-white shadow-sm overflow-hidden">
                <Image
                  src="/images/private-hallway.webp"
                  alt="Private office hallway with secure door — discretion and safety"
                  width={400}
                  height={200}
                  className="w-full h-40 object-cover object-[center_35%]"
                />
                <div className="p-5">
                  <h3 className="text-base font-semibold text-brand-900">Scheduling &amp; Coordination</h3>
                  <p className="mt-2 text-sm text-brand-700">SafeProvider handles intake and scheduling so you can focus on your family.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Starter examples — each card has a relevant image header */}
          <div className="mt-16">
            <h2 className="text-2xl font-semibold text-brand-900 text-center mb-2">Example Totals</h2>
            <p className="text-brand-600 text-center text-sm mb-8">See what families like yours typically pay at their first session.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="rounded-xl border border-brand-500/20 bg-white shadow-sm overflow-hidden">
                <Image
                  src="/images/community-coloring.webp"
                  alt="Parent and child coloring together at a community center"
                  width={400}
                  height={160}
                  className="w-full h-32 object-cover object-[center_35%]"
                />
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-brand-900 mb-1">Supervised Visitation Starter</h3>
                  <p className="text-sm text-brand-500 mb-4">First visit — two parents, one child</p>
                  <ul className="space-y-2 text-brand-700">
                    <li className="flex justify-between">
                      <span>2-person intake ($50 x 2)</span>
                      <span className="font-semibold text-brand-900">$100</span>
                    </li>
                    <li className="flex justify-between">
                      <span>First visit, 2 hours ($70 x 2)</span>
                      <span className="font-semibold text-brand-900">$140</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Platform fee</span>
                      <span className="font-semibold text-brand-900">$99</span>
                    </li>
                    <li className="flex justify-between border-t border-brand-500/20 pt-2">
                      <span className="font-semibold">Total</span>
                      <span className="font-bold text-brand-900">$339</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="rounded-xl border border-brand-500/20 bg-white shadow-sm overflow-hidden">
                <Image
                  src="/images/hero-exchange.webp"
                  alt="Neutral monitor facilitating a supervised custody exchange between parents"
                  width={400}
                  height={160}
                  className="w-full h-32 object-cover object-[center_25%]"
                />
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-brand-900 mb-1">Supervised Exchange Starter</h3>
                  <p className="text-sm text-brand-500 mb-4">First exchange — two parents</p>
                  <ul className="space-y-2 text-brand-700">
                    <li className="flex justify-between">
                      <span>2-person intake ($50 x 2)</span>
                      <span className="font-semibold text-brand-900">$100</span>
                    </li>
                    <li className="flex justify-between">
                      <span>First exchange</span>
                      <span className="font-semibold text-brand-900">$70</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Platform fee</span>
                      <span className="font-semibold text-brand-900">$99</span>
                    </li>
                    <li className="flex justify-between border-t border-brand-500/20 pt-2">
                      <span className="font-semibold">Total</span>
                      <span className="font-bold text-brand-900">$269</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="rounded-xl border border-brand-500/20 bg-white shadow-sm overflow-hidden">
                <Image
                  src="/images/park-visit-1.webp"
                  alt="Father and daughter drawing together on a park bench"
                  width={400}
                  height={160}
                  className="w-full h-32 object-cover object-[center_35%]"
                />
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-brand-900 mb-1">30-Day Visit Package</h3>
                  <p className="text-sm text-brand-500 mb-4">Four visits over 30 days (most common)</p>
                  <ul className="space-y-2 text-brand-700">
                    <li className="flex justify-between">
                      <span>2-person intake ($50 x 2)</span>
                      <span className="font-semibold text-brand-900">$100</span>
                    </li>
                    <li className="flex justify-between">
                      <span>4 visits, 2 hrs each ($70 x 2 x 4)</span>
                      <span className="font-semibold text-brand-900">$560</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Platform fee</span>
                      <span className="font-semibold text-brand-900">$99</span>
                    </li>
                    <li className="flex justify-between border-t border-brand-500/20 pt-2">
                      <span className="font-semibold">Total</span>
                      <span className="font-bold text-brand-900">$759</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-6 text-sm text-brand-500 text-center">
            Provider rates from the Santa Clara County court provider list (revised February 3, 2026).
          </p>

          {/* Trust & compliance — text pills, not a dumped image */}
          <div className="mt-16 max-w-3xl mx-auto rounded-xl bg-brand-100 p-6">
            <h2 className="text-lg font-semibold text-brand-900 mb-2">Every visit is backed by California Standard 5.20 compliance</h2>
            <p className="text-sm text-brand-700 mb-4">
              Your monitor has completed criminal background checks, mandated training, and follows court-defined rules for neutrality and documentation.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Background Checks", "Certified Training", "Strict Confidentiality", "Neutral Supervision", "Flexible Scheduling", "Court-Ready Docs"].map((label) => (
                <span key={label} className="rounded-full bg-white px-3 py-1 text-xs font-medium text-brand-700 shadow-sm">
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-16 max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold text-brand-900 text-center mb-8">Pricing FAQ</h2>
            <FaqAccordion items={PRICING_FAQ} />
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
