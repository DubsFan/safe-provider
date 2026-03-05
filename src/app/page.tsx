import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { PricingTable } from "@/components/ui/PricingTable";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { faqSchema } from "@/lib/seo/schemas";
import { COUNTIES, PHONE, SITE_URL } from "@/lib/site-config";
import { Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Supervised Visitation & Custody Exchange — Bay Area | SafeProvider",
  description: "Court-compliant supervised visitation and custody exchange in the Bay Area. Online intake, transparent pricing, 8-hour response. Santa Clara, Alameda, Contra Costa, San Francisco.",
  alternates: { canonical: `${SITE_URL}/` },
};

const FAQ_ITEMS = [
  { question: "How much does supervised visitation cost?", answer: "Intake is $50 per person. Supervised visitation is $70 per hour with a 2-hour minimum. A platform scheduling fee of $99 applies to each case booked through SafeProvider. For a typical first visit with two parents and one child, the total is $339. See our pricing page for full details." },
  { question: "How much does supervised exchange cost?", answer: "Intake is $50 per person. Each supervised exchange is $70. A platform scheduling fee of $99 applies. For a typical first exchange with two parents, the total is $269." },
  { question: "Do I need a court order?", answer: "Not required to start intake. Most families have one. If unsure, consult your attorney." },
  { question: "How long does it take to get started?", answer: "After intake and payment, SafePair reviews your case within 1-2 business days. If accepted, scheduling begins within 3-5 business days. Total: 3-7 business days from intake to first session." },
  { question: "What happens after I pay?", answer: "Payment reserves your intake slot and triggers case review. SafePair reviews independently. If accepted, they contact you to schedule. If declined, full refund." },
];

const liveCounties = COUNTIES.filter((c) => c.status === "live");

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqSchema(FAQ_ITEMS) }}
      />

      {/* Hero — looping video with image fallback */}
      <section className="relative bg-brand-900 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/images/father-son-library.webp"
          className="w-full h-[28rem] sm:h-[34rem] object-cover object-[center_35%]"
        >
          <source src="/images/hero-loop.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-900/80 via-brand-900/40 to-brand-900/20 flex items-end pb-12 sm:pb-16 justify-center">
          <div className="text-center px-4 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-white sm:text-5xl leading-tight">
              Court-Ready Supervised Visitation Across the Bay Area
            </h1>
            <p className="mt-4 text-lg text-gray-200 max-w-2xl mx-auto">
              Safe, neutral, child-focused visits and exchanges. Handled with dignity, confidentiality, and strict California compliance.
            </p>
            <p className="mt-3 text-sm text-gray-300">
              Intake response within 8 business hours.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/start"
                className="rounded-lg bg-accent-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-accent-500 transition-colors"
              >
                Start Intake
              </Link>
              <a
                href={`tel:${PHONE.replace(/[^+\d]/g, "")}`}
                className="rounded-lg border border-white/40 bg-white/10 backdrop-blur px-6 py-3 text-base font-semibold text-white hover:bg-white/20 transition-colors inline-flex items-center justify-center gap-2"
              >
                <Phone className="h-4 w-4" />
                Call Now
              </a>
              <Link
                href="/pricing"
                className="text-accent-100 hover:text-white font-semibold text-base py-3 px-6"
              >
                See Pricing &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services — 4-panel graphic with links */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-brand-900 text-center mb-3">Our Services</h2>
          <p className="text-brand-600 text-center max-w-2xl mx-auto mb-8">
            Four ways SafePair supports your family — from in-person visits to virtual sessions and court documentation.
          </p>
          <Image
            src="/images/service-cards.webp"
            alt="Four services: Supervised Visitation, Custody Exchange, Progress Reports, and Virtual Visitation"
            width={2752}
            height={1536}
            className="w-full rounded-xl shadow-md"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <Link href="/services/supervised-visitation" className="rounded-lg border border-brand-500/20 bg-white px-4 py-3 text-center hover:shadow-md transition-shadow">
              <span className="text-sm font-semibold text-brand-900">Supervised Visitation</span>
              <span className="block mt-1 text-xs text-accent-600">Learn more &rarr;</span>
            </Link>
            <Link href="/services/supervised-exchange" className="rounded-lg border border-brand-500/20 bg-white px-4 py-3 text-center hover:shadow-md transition-shadow">
              <span className="text-sm font-semibold text-brand-900">Custody Exchange</span>
              <span className="block mt-1 text-xs text-accent-600">Learn more &rarr;</span>
            </Link>
            <Link href="/services/supervised-visitation" className="rounded-lg border border-brand-500/20 bg-white px-4 py-3 text-center hover:shadow-md transition-shadow">
              <span className="text-sm font-semibold text-brand-900">Progress Reports</span>
              <span className="block mt-1 text-xs text-accent-600">Learn more &rarr;</span>
            </Link>
            <Link href="/contact" className="rounded-lg border border-brand-500/20 bg-white px-4 py-3 text-center hover:shadow-md transition-shadow">
              <span className="text-sm font-semibold text-brand-900">Virtual Visitation</span>
              <span className="block mt-1 text-xs text-accent-600">Ask about availability &rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* What a visit looks like — real photos, real families */}
      <section className="bg-brand-50 py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-brand-900 text-center mb-3">What Visits Look Like</h2>
          <p className="text-brand-600 text-center max-w-2xl mx-auto mb-8">
            Every family is different. Visits happen in parks, libraries, community centers — wherever your child feels safe and comfortable.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Supervised visit — father and daughter at community center */}
            <div className="rounded-xl overflow-hidden shadow-sm bg-white">
              <Image
                src="/images/community-coloring.webp"
                alt="Mother and child coloring together with crayons at a community center table"
                width={800}
                height={800}
                className="w-full h-56 sm:h-64 object-cover object-[center_35%]"
              />
              <div className="p-5">
                <h3 className="text-base font-semibold text-brand-900">Coloring Together</h3>
                <p className="mt-1 text-sm text-brand-600">A parent and child drawing at a community center. The monitor sits nearby, observing quietly — no interruptions, no pressure.</p>
              </div>
            </div>

            {/* Park visit — father and daughter */}
            <div className="rounded-xl overflow-hidden shadow-sm bg-white">
              <Image
                src="/images/park-visit-1.webp"
                alt="Father and daughter drawing together with markers at a park bench"
                width={800}
                height={800}
                className="w-full h-56 sm:h-64 object-cover object-[center_35%]"
              />
              <div className="p-5">
                <h3 className="text-base font-semibold text-brand-900">Drawing at the Park</h3>
                <p className="mt-1 text-sm text-brand-600">Outdoor visits give families room to connect naturally. Drawing, playing, talking — whatever feels right for your child.</p>
              </div>
            </div>

            {/* Supervised exchange at school — video loop */}
            <div className="rounded-xl overflow-hidden shadow-sm bg-white">
              <video
                autoPlay
                loop
                muted
                playsInline
                poster="/images/exchange-school.webp"
                className="w-full h-56 sm:h-64 object-cover object-[center_40%]"
              >
                <source src="/images/exchange-loop.mp4" type="video/mp4" />
              </video>
              <div className="p-5">
                <h3 className="text-base font-semibold text-brand-900">Structured Exchange</h3>
                <p className="mt-1 text-sm text-brand-600">The monitor walks your child between parents at a neutral location. No direct contact between adults needed. Calm, safe, documented.</p>
              </div>
            </div>

            {/* Virtual visit */}
            <div className="rounded-xl overflow-hidden shadow-sm bg-white">
              <Image
                src="/images/virtual-visit-boy.webp"
                alt="Young boy participating in a supervised virtual visit on a laptop with headphones"
                width={2752}
                height={1536}
                className="w-full h-56 sm:h-64 object-cover object-[center_35%]"
              />
              <div className="p-5">
                <h3 className="text-base font-semibold text-brand-900">Virtual Visits</h3>
                <p className="mt-1 text-sm text-brand-600">When distance or safety requires it, supervised video visits keep parent and child connected with a monitor present throughout.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Compliance — real graphic */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-brand-900 text-center mb-3">Trust &amp; Compliance</h2>
          <p className="text-brand-600 text-center max-w-2xl mx-auto mb-8">
            Every provider passes background checks and completes mandated training before supervising a single visit.
          </p>
          <Image
            src="/images/trust-compliance.webp"
            alt="Four compliance pillars: Rigorous Background Checks, Certified Structured Training, Strict Confidentiality, Unbiased Neutral Supervision — plus court order documentation"
            width={2752}
            height={1536}
            className="w-full rounded-xl shadow-md"
          />
          <div className="mt-6 rounded-xl bg-brand-50 p-6">
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <Image
                src="/images/secure-entrance.webp"
                alt="Secure entrance to supervised visitation facility with family safety icon on door and staff member in background"
                width={400}
                height={224}
                className="shrink-0 w-full sm:w-48 h-32 sm:h-full rounded-lg object-cover"
              />
              <div>
                <h3 className="text-lg font-semibold text-brand-900 mb-2">California Standard 5.20 Compliant</h3>
                <p className="text-sm text-brand-700">
                  Standard 5.20 means the person supervising your visit has passed a criminal background check, completed 24+ hours of mandated training on child safety and domestic violence, and follows court-defined rules for neutrality, confidentiality, and documentation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="bg-brand-50 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-brand-900 text-center mb-3">Meet the Team</h2>
          <p className="text-brand-600 text-center max-w-2xl mx-auto mb-8">
            SafePair&apos;s supervised visitation providers are trained professionals — background-checked, certified, and committed to your child&apos;s safety.
          </p>
          <Image
            src="/images/team-headshots.webp"
            alt="Four SafePair supervised visitation providers — professional headshots showing diverse team members"
            width={1024}
            height={1536}
            className="w-full max-w-md mx-auto rounded-xl shadow-md"
          />
        </div>
      </section>

      {/* How it works — provider reviewing documentation */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-brand-900 text-center mb-8">3 Simple Steps</h2>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="shrink-0 w-full md:w-2/5">
              <Image
                src="/images/provider-review.webp"
                alt="SafePair provider reviewing case documentation in a conference room"
                width={3398}
                height={1248}
                className="w-full rounded-xl shadow-sm"
              />
              <p className="mt-3 text-xs text-brand-500 text-center">SafePair reviews every case independently before accepting.</p>
            </div>
            <div className="flex-1 space-y-6">
              {[
                { step: "1", title: "Complete Intake", desc: "Fill out the online intake form with your county, service, and family details. About 5 minutes." },
                { step: "2", title: "Pay Securely", desc: "See your exact total before you pay. Intake, first session, and platform fees — all upfront, no surprises." },
                { step: "3", title: "Get Scheduled", desc: "SafePair reviews your case within 1-2 business days. Once accepted, they contact you directly to schedule." },
              ].map((item) => (
                <div key={item.step} className="flex gap-4 items-start">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-accent-600 text-white flex items-center justify-center text-lg font-bold">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-brand-900">{item.title}</h3>
                    <p className="mt-1 text-sm text-brand-700">{item.desc}</p>
                  </div>
                </div>
              ))}
              <Link href="/how-it-works" className="inline-block text-sm font-semibold text-accent-600 hover:text-accent-500 ml-14">See the full 5-step process &rarr;</Link>
            </div>
          </div>
        </div>
      </section>

      {/* About SafeProvider — with attorney scene */}
      <section className="bg-brand-100 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-6 items-center">
            <Image
              src="/images/attorney-review-2.webp"
              alt="Professional reviewing court documents at a conference table"
              width={500}
              height={280}
              className="shrink-0 w-full sm:w-1/2 rounded-xl shadow-sm"
            />
            <div>
              <h2 className="text-xl font-semibold text-brand-900 mb-3">About SafeProvider</h2>
              <p className="text-sm text-brand-700 mb-3">
                SafeProvider manages intake, scheduling, and payment for supervised visitation
                and custody exchange services. We are not a law firm and we are not the
                court-listed provider.
              </p>
              <p className="text-sm text-brand-700">
                All services are delivered by SafePair, a professional
                supervised visitation provider operating in compliance with California Standard 5.20.
                SafePair independently reviews and accepts each case.
              </p>
              <Link href="/for-attorneys" className="mt-3 inline-block text-sm font-semibold text-accent-600 hover:text-accent-500">Attorney resources &rarr;</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Counties */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-brand-900 text-center mb-8">
            Counties We Serve
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {liveCounties.map((county) => (
              <Link
                key={county.slug}
                href={`/counties/${county.slug}`}
                className="rounded-xl border border-brand-500/20 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold text-brand-900">{county.name}</h3>
                <p className="mt-2 text-sm text-brand-500">Supervised visitation &amp; exchange</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 bg-brand-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-brand-900 text-center mb-8">
            Transparent Pricing
          </h2>
          <PricingTable />
          <div className="mt-8 text-center">
            <Link href="/pricing" className="text-accent-600 hover:text-accent-500 font-semibold text-sm">
              View full pricing details &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-brand-100 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-brand-900 text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto">
            <FaqAccordion items={FAQ_ITEMS} />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-brand-900 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-semibold text-white mb-4">
            You already have enough stress.
          </h2>
          <p className="text-gray-300 mb-4 max-w-2xl mx-auto">
            We handle intake and scheduling so SafePair can focus on safe, structured visits for your child.
          </p>
          <p className="text-sm text-gray-400 mb-8">
            Intake response within 8 business hours.
          </p>
          <Link
            href="/start"
            className="rounded-lg bg-accent-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-accent-500 transition-colors"
          >
            Start Intake
          </Link>
        </div>
      </section>
    </>
  );
}
