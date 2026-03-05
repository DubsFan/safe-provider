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

          {/* What you pay for */}
          <div className="mt-12 rounded-xl border border-brand-500/20 bg-white p-6 shadow-sm max-w-3xl mx-auto">
            <h2 className="text-xl font-semibold text-brand-900 mb-4">What You Pay For</h2>
            <ul className="space-y-2 text-brand-700">
              <li>Neutral supervision by a trained professional monitor.</li>
              <li>Documentation and reports for your case.</li>
              <li>Safety-first structure that protects the child and reduces conflict.</li>
              <li>Scheduling coordination through SafeProvider.</li>
            </ul>
          </div>

          {/* Service cards image */}
          <div className="mt-12 max-w-4xl mx-auto">
            <Image
              src="/images/service-visitation.webp"
              alt="Parent and child reading together during a supervised visitation session"
              width={1200}
              height={400}
              className="w-full rounded-xl shadow-sm"
            />
          </div>

          {/* Starter examples */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-xl border border-brand-500/20 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-brand-900 mb-1">Supervised Visitation Starter</h3>
              <p className="text-sm text-brand-500 mb-4">Typical first visit for two parents and one child</p>
              <ul className="space-y-2 text-brand-700">
                <li className="flex justify-between">
                  <span>2-person intake ($50 x 2)</span>
                  <span className="font-semibold text-brand-900">$100.00</span>
                </li>
                <li className="flex justify-between">
                  <span>First visit, 2 hours ($70 x 2)</span>
                  <span className="font-semibold text-brand-900">$140.00</span>
                </li>
                <li className="flex justify-between">
                  <span>Platform fee</span>
                  <span className="font-semibold text-brand-900">$99.00</span>
                </li>
                <li className="flex justify-between border-t border-brand-500/20 pt-2">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-brand-900">$339.00</span>
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-brand-500/20 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-brand-900 mb-1">Supervised Exchange Starter</h3>
              <p className="text-sm text-brand-500 mb-4">Typical first exchange for two parents</p>
              <ul className="space-y-2 text-brand-700">
                <li className="flex justify-between">
                  <span>2-person intake ($50 x 2)</span>
                  <span className="font-semibold text-brand-900">$100.00</span>
                </li>
                <li className="flex justify-between">
                  <span>First exchange</span>
                  <span className="font-semibold text-brand-900">$70.00</span>
                </li>
                <li className="flex justify-between">
                  <span>Platform fee</span>
                  <span className="font-semibold text-brand-900">$99.00</span>
                </li>
                <li className="flex justify-between border-t border-brand-500/20 pt-2">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-brand-900">$269.00</span>
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-brand-500/20 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-brand-900 mb-1">30-Day Visit Package</h3>
              <p className="text-sm text-brand-500 mb-4">Four visits over 30 days (most common)</p>
              <ul className="space-y-2 text-brand-700">
                <li className="flex justify-between">
                  <span>2-person intake ($50 x 2)</span>
                  <span className="font-semibold text-brand-900">$100.00</span>
                </li>
                <li className="flex justify-between">
                  <span>4 visits, 2 hrs each ($70 x 2 x 4)</span>
                  <span className="font-semibold text-brand-900">$560.00</span>
                </li>
                <li className="flex justify-between">
                  <span>Platform fee</span>
                  <span className="font-semibold text-brand-900">$99.00</span>
                </li>
                <li className="flex justify-between border-t border-brand-500/20 pt-2">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-brand-900">$759.00</span>
                </li>
              </ul>
            </div>
          </div>

          <p className="mt-8 text-sm text-brand-500 text-center">
            Provider rates from the Santa Clara County court provider list (revised February 3, 2026).
          </p>

          {/* Trust badges */}
          <div className="mt-12 max-w-3xl mx-auto">
            <Image
              src="/images/trust-icons.webp"
              alt="Trust icons: background checks, certified training, strict confidentiality, neutral supervision, flexible scheduling, court-ready documentation"
              width={800}
              height={200}
              className="w-full rounded-xl"
            />
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
