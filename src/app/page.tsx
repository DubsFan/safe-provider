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

const SERVICE_CARDS = [
  { label: "Supervised Visitation", description: "Calm, structured, child-centered visits led by a trained professional monitor.", href: "/services/supervised-visitation" },
  { label: "Supervised Exchange", description: "Custody handoffs that reduce conflict and protect children during transitions.", href: "/services/supervised-exchange" },
  { label: "Court-Ready Documentation", description: "Professional reports and testimony for parents and courts.", href: "/services/supervised-visitation" },
];

const TRUST_BULLETS = [
  "SafePair operates in compliance with California Family Code Section 3200.5 and California Rules of Court Standard 5.20.",
  "Standard 5.20 requires professional providers to complete a Live Scan criminal background check before providing services.",
  "Sliding-scale rates available for qualifying families. Ask about eligibility during intake.",
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqSchema(FAQ_ITEMS) }}
      />

      {/* Hero */}
      <section className="relative bg-brand-900 overflow-hidden">
        <Image
          src="/images/landing-hero.webp"
          alt="Supervised visitation session and diverse families served by SafeProvider"
          width={1400}
          height={700}
          className="w-full h-[28rem] sm:h-[32rem] object-cover opacity-50"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-white sm:text-5xl">
              Court-Ready Supervised Visitation Across the Bay Area
            </h1>
            <p className="mt-4 text-lg text-gray-200 max-w-2xl mx-auto">
              Safe, neutral, child-focused visits and exchanges. Handled with dignity, confidentiality, and strict California compliance.
            </p>
            <p className="mt-3 text-sm text-gray-300">
              Get an intake response within 8 hours or by the end of the business day.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
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

      {/* Service Cards */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-brand-900 text-center mb-8">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SERVICE_CARDS.map((card) => (
              <Link key={card.label} href={card.href} className="rounded-xl border border-brand-500/20 bg-white p-6 shadow-sm text-center hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-brand-900">{card.label}</h3>
                <p className="mt-2 text-sm text-brand-700">{card.description}</p>
                <span className="mt-3 inline-block text-sm font-semibold text-accent-600">Learn more &rarr;</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Compliance */}
      <section className="bg-brand-100 py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-brand-900 text-center mb-8">
            Trust &amp; Compliance
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: "Background Checks", desc: "Live Scan criminal background check required by Standard 5.20" },
              { title: "Certified Training", desc: "24+ hours of mandated training including child safety and domestic violence" },
              { title: "Strict Confidentiality", desc: "Court-defined rules for confidentiality and documentation" },
              { title: "Neutral Supervision", desc: "Unbiased third-party monitor who follows your court order" },
            ].map((badge) => (
              <div key={badge.title} className="rounded-xl bg-white p-4 shadow-sm text-center">
                <h3 className="text-sm font-semibold text-brand-900">{badge.title}</h3>
                <p className="mt-1 text-xs text-brand-500">{badge.desc}</p>
              </div>
            ))}
          </div>
          <ul className="mt-6 space-y-2 text-center">
            {TRUST_BULLETS.map((bullet, i) => (
              <li key={i} className="text-sm text-brand-500">{bullet}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* About SafeProvider */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-semibold text-brand-900 mb-4">About SafeProvider</h2>
          <p className="text-brand-700">
            SafeProvider manages intake, scheduling, and payment for supervised visitation
            and custody exchange services. We are not a law firm and we are not the
            court-listed provider. All services are delivered by SafePair, a professional
            supervised visitation provider operating in compliance with California Standard 5.20.
            SafePair independently reviews and accepts each case.
          </p>
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

      {/* 3-Step Process */}
      <section className="bg-brand-100 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-brand-900 text-center mb-8">
            3 Simple Steps
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Complete Intake", desc: "Fill out the online intake form with your county, service, and family details. About 5 minutes." },
              { step: "2", title: "Pay Securely", desc: "Pay the intake fee, first session fee, and platform fee through our secure checkout. Your total is calculated before you pay." },
              { step: "3", title: "Get Scheduled", desc: "SafePair reviews your case within 1-2 business days. Once accepted, they contact you to schedule." },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-accent-600 text-white flex items-center justify-center text-lg font-bold">
                  {item.step}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-brand-900">{item.title}</h3>
                <p className="mt-2 text-sm text-brand-700">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-brand-900 text-center mb-8">
            Transparent Pricing
          </h2>
          <PricingTable />
          <div className="mt-8 text-center">
            <Link
              href="/pricing"
              className="text-accent-600 hover:text-accent-500 font-semibold text-sm"
            >
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
            Get an intake response within 8 hours or by the end of the business day.
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
