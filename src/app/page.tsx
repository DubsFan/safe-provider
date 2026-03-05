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
          poster="/images/hero-poster.webp"
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
                className="rounded-lg border border-white/40 bg-surface-card/10 backdrop-blur px-6 py-3 text-base font-semibold text-white hover:bg-surface-card/20 transition-colors inline-flex items-center justify-center gap-2"
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
          <h2 className="text-2xl font-semibold text-text-heading text-center mb-3">Our Services</h2>
          <p className="text-text-muted text-center max-w-2xl mx-auto mb-8">
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
            <Link href="/services/supervised-visitation" className="rounded-lg border border-border-default bg-surface-card px-4 py-3 text-center hover:shadow-md transition-shadow">
              <span className="text-sm font-semibold text-text-heading">Supervised Visitation</span>
              <span className="block mt-1 text-xs text-accent-600">Learn more &rarr;</span>
            </Link>
            <Link href="/services/supervised-exchange" className="rounded-lg border border-border-default bg-surface-card px-4 py-3 text-center hover:shadow-md transition-shadow">
              <span className="text-sm font-semibold text-text-heading">Custody Exchange</span>
              <span className="block mt-1 text-xs text-accent-600">Learn more &rarr;</span>
            </Link>
            <Link href="/services/supervised-visitation" className="rounded-lg border border-border-default bg-surface-card px-4 py-3 text-center hover:shadow-md transition-shadow">
              <span className="text-sm font-semibold text-text-heading">Progress Reports</span>
              <span className="block mt-1 text-xs text-accent-600">Learn more &rarr;</span>
            </Link>
            <Link href="/contact" className="rounded-lg border border-border-default bg-surface-card px-4 py-3 text-center hover:shadow-md transition-shadow">
              <span className="text-sm font-semibold text-text-heading">Virtual Visitation</span>
              <span className="block mt-1 text-xs text-accent-600">Ask about availability &rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* What a visit looks like — real photos, real families */}
      <section className="bg-surface-subtle py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-text-heading text-center mb-3">What Visits Look Like</h2>
          <p className="text-text-muted text-center max-w-2xl mx-auto mb-8">
            Every family is different. Visits happen in parks, libraries, community centers — wherever your child feels safe and comfortable.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Supervised visit — father and daughter at community center */}
            <div className="rounded-xl overflow-hidden shadow-sm bg-surface-card">
              <Image
                src="/images/community-coloring.webp"
                alt="Mother and child coloring together with crayons at a community center table"
                width={800}
                height={800}
                className="w-full h-56 sm:h-64 object-cover object-[center_35%]"
              />
              <div className="p-5">
                <h3 className="text-base font-semibold text-text-heading">Coloring Together</h3>
                <p className="mt-1 text-sm text-text-muted">A parent and child drawing at a community center. The monitor sits nearby, observing quietly — no interruptions, no pressure.</p>
              </div>
            </div>

            {/* Park visit — father and daughter */}
            <div className="rounded-xl overflow-hidden shadow-sm bg-surface-card">
              <Image
                src="/images/park-visit-1.webp"
                alt="Father and daughter drawing together with markers at a park bench"
                width={800}
                height={800}
                className="w-full h-56 sm:h-64 object-cover object-[center_35%]"
              />
              <div className="p-5">
                <h3 className="text-base font-semibold text-text-heading">Drawing at the Park</h3>
                <p className="mt-1 text-sm text-text-muted">Outdoor visits give families room to connect naturally. Drawing, playing, talking — whatever feels right for your child.</p>
              </div>
            </div>

            {/* Supervised exchange at school — video loop */}
            <div className="rounded-xl overflow-hidden shadow-sm bg-surface-card">
              <video
                autoPlay
                loop
                muted
                playsInline
                poster="/images/exchange-school.webp"
                className="w-full h-56 sm:h-64 object-cover object-[center_35%]"
              >
                <source src="/images/exchange-loop.mp4" type="video/mp4" />
              </video>
              <div className="p-5">
                <h3 className="text-base font-semibold text-text-heading">Structured Exchange</h3>
                <p className="mt-1 text-sm text-text-muted">The monitor walks your child between parents at a neutral location. No direct contact between adults needed. Calm, safe, documented.</p>
              </div>
            </div>

            {/* Virtual visit */}
            <div className="rounded-xl overflow-hidden shadow-sm bg-surface-card">
              <Image
                src="/images/virtual-visit-boy.webp"
                alt="Young boy participating in a supervised virtual visit on a laptop with headphones"
                width={2752}
                height={1536}
                className="w-full h-56 sm:h-64 object-cover object-[center_35%]"
              />
              <div className="p-5">
                <h3 className="text-base font-semibold text-text-heading">Virtual Visits</h3>
                <p className="mt-1 text-sm text-text-muted">When distance or safety requires it, supervised video visits keep parent and child connected with a monitor present throughout.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Compliance — clean badges + 5.20 integrated */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-10 items-center">
            <div className="lg:w-1/2">
              <div className="relative rounded-2xl overflow-hidden shadow-md">
                <Image
                  src="/images/secure-entrance.webp"
                  alt="Secure entrance to supervised visitation facility"
                  width={600}
                  height={400}
                  className="w-full h-72 sm:h-80 object-cover object-[center_35%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-900/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-white font-semibold">California Standard 5.20</p>
                  <p className="text-gray-200 text-sm mt-1">Court-defined rules for safety, neutrality, and documentation.</p>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-2xl font-semibold text-text-heading mb-3">Trust &amp; Compliance</h2>
              <p className="text-text-body mb-6">
                Every provider passes a criminal background check, completes 24+ hours of mandated training on child safety and domestic violence, and follows court-defined rules for neutrality, confidentiality, and documentation.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Background Checks", desc: "Criminal history verified" },
                  { label: "Certified Training", desc: "24+ hours mandated" },
                  { label: "Strict Confidentiality", desc: "Protected information" },
                  { label: "Neutral Supervision", desc: "Unbiased monitoring" },
                ].map((item) => (
                  <div key={item.label} className="rounded-lg bg-surface-subtle p-3">
                    <p className="text-sm font-semibold text-text-heading">{item.label}</p>
                    <p className="text-xs text-text-muted mt-0.5">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Simple Steps — image-topped cards */}
      <section className="bg-surface-subtle py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-text-heading text-center mb-3">3 Simple Steps</h2>
          <p className="text-text-muted text-center max-w-2xl mx-auto mb-10">
            From intake to your first scheduled visit in 3-7 business days.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: "1", title: "Complete Intake", desc: "Fill out the online intake form with your county, service, and family details. About 5 minutes.", image: "/images/intake-poster.webp", alt: "Hands filling out intake form on tablet" },
              { step: "2", title: "Pay Securely", desc: "See your exact total before you pay. Intake, first session, and platform fees — all upfront, no surprises.", image: "/images/private-hallway.webp", alt: "Private office hallway — secure and discreet" },
              { step: "3", title: "Get Scheduled", desc: "SafePair reviews your case within 1-2 business days. Once accepted, they contact you directly to schedule.", image: "/images/provider-review.webp", alt: "Provider reviewing case documentation" },
            ].map((item) => (
              <div key={item.step} className="rounded-xl overflow-hidden bg-surface-card shadow-sm border border-border-default">
                <div className="relative">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    width={400}
                    height={200}
                    className="w-full h-40 object-cover object-[center_35%]"
                  />
                  <div className="absolute top-3 left-3 w-9 h-9 rounded-full bg-accent-600 text-white flex items-center justify-center text-sm font-bold shadow-md">
                    {item.step}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-semibold text-text-heading">{item.title}</h3>
                  <p className="mt-2 text-sm text-text-body">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/how-it-works" className="text-sm font-semibold text-accent-600 hover:text-accent-500">See the full 5-step process &rarr;</Link>
          </div>
        </div>
      </section>

      {/* About SafeProvider + Team — balanced 50/50 */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-10 items-center">
            <div className="lg:w-1/2">
              <div className="relative rounded-2xl overflow-hidden shadow-md">
                <Image
                  src="/images/team-headshots.webp"
                  alt="Four SafePair supervised visitation providers"
                  width={600}
                  height={500}
                  className="w-full h-auto object-contain"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-900/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-white font-semibold">Meet the Team</p>
                  <p className="text-gray-200 text-sm mt-1">Background-checked, certified, and committed to your child&apos;s safety.</p>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-2xl font-semibold text-text-heading mb-4">About SafeProvider</h2>
              <p className="text-text-body mb-4">
                SafeProvider manages intake, scheduling, and payment for supervised visitation
                and custody exchange services. We are not a law firm and we are not the
                court-listed provider.
              </p>
              <p className="text-text-body mb-6">
                All services are delivered by SafePair, a professional
                supervised visitation provider operating in compliance with California Standard 5.20.
                SafePair independently reviews and accepts each case.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/for-attorneys" className="inline-block rounded-lg border border-border-default px-4 py-2 text-sm font-semibold text-text-heading hover:bg-surface-subtle transition-colors">
                  Attorney Resources &rarr;
                </Link>
                <Link href="/how-it-works" className="inline-block rounded-lg border border-border-default px-4 py-2 text-sm font-semibold text-text-heading hover:bg-surface-subtle transition-colors">
                  How It Works &rarr;
                </Link>
                <Link href="/about-safepair" className="inline-block rounded-lg border border-border-default px-4 py-2 text-sm font-semibold text-text-heading hover:bg-surface-subtle transition-colors">
                  About SafePair &rarr;
                </Link>
                <Link href="/contact" className="inline-block rounded-lg border border-border-default px-4 py-2 text-sm font-semibold text-text-heading hover:bg-surface-subtle transition-colors">
                  Contact Us &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Counties — image cards */}
      <section className="bg-surface-subtle py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-text-heading text-center mb-3">Counties We Serve</h2>
          <p className="text-text-muted text-center max-w-2xl mx-auto mb-10">
            Court-compliant supervised visitation and exchange across the Bay Area.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {liveCounties.map((county) => {
              const images: Record<string, { src: string; alt: string }> = {
                "santa-clara": { src: "/images/father-son-library.webp", alt: "Father and son reading at a library" },
                alameda: { src: "/images/community-coloring.webp", alt: "Parent and child coloring together" },
                "contra-costa": { src: "/images/park-visit-1.webp", alt: "Father and daughter at a park" },
                "san-francisco": { src: "/images/virtual-visit-boy.webp", alt: "Boy on a supervised virtual visit" },
              };
              const img = images[county.slug];
              return (
                <Link
                  key={county.slug}
                  href={`/counties/${county.slug}`}
                  className="group rounded-xl border border-border-default bg-surface-card shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                >
                  {img && (
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={400}
                      height={200}
                      className="w-full h-32 object-cover object-[center_35%] group-hover:scale-[1.02] transition-transform duration-300"
                    />
                  )}
                  <div className="p-4">
                    <h3 className="text-base font-semibold text-text-heading">{county.name}</h3>
                    <span className="mt-1 inline-block text-xs font-semibold text-accent-600 group-hover:text-accent-500">View details &rarr;</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 bg-surface-subtle">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-text-heading text-center mb-8">
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
      <section className="bg-surface-muted py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-text-heading text-center mb-8">
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
