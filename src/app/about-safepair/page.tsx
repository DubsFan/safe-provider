import Link from "next/link";
import Image from "next/image";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "About SafePair — Our Provider Partner",
  description:
    "SafePair delivers professional, child-focused supervised visitation and exchange services across the Bay Area. Founded by Winston Franklin, a certified provider based in Oakland.",
  path: "/about-safepair",
});

const COURT_RESOURCES = [
  {
    label: "California Access to Visitation Grant Program",
    href: "http://www.courts.ca.gov/cfcc-accesstovisitation.htm",
  },
  {
    label: "California Courts",
    href: "https://courts.ca.gov/",
  },
  {
    label: "California Court Forms",
    href: "https://courts.ca.gov/rules-forms/find-your-court-forms",
  },
  {
    label:
      "2025 California Rules of Court 5.20 — Uniform Standards of Practice for Providers of Supervised Visitation",
    href: "https://courts.ca.gov/cms/rules/index/standards/standard5_20",
  },
];

const FAMILY_GUIDES = [
  {
    label: "Families Change — Parent Guide to Separation & Divorce",
    href: "https://familieschange.ca.gov/en/parents/parent-guide",
    desc: "California's official guide helping parents navigate separation with their children's well-being in mind.",
  },
  {
    label: "Families Change — For Teens",
    href: "https://familieschange.ca.gov/en/teens",
    desc: "Age-appropriate resources helping teenagers understand and cope with family changes.",
  },
  {
    label: "Families Change — For Kids",
    href: "https://familieschange.ca.gov/en/kids",
    desc: "Gentle, child-friendly resources that help younger children process what's happening in their family.",
  },
];

const VIDEOS = [
  {
    title: "What Is Supervised Visitation?",
    embedId: "cw37ovj9BDk",
  },
  {
    title: "When You Haven't Seen Your Kids in a While",
    embedId: "hs-uCSabBgU",
  },
  {
    title: "Co-Parenting After Separation",
    embedId: "LtRHxh0ykIw",
  },
];

export default function AboutSafePairPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-brand-900 overflow-hidden">
        <Image
          src="/images/safepair-hero.avif"
          alt="SafePair supervised visitation services"
          width={1920}
          height={600}
          className="w-full h-72 sm:h-80 md:h-96 lg:h-[28rem] object-cover object-[center_35%] opacity-40"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-4xl font-bold text-white sm:text-5xl">
              Our Provider Partner
            </h1>
            <p className="mt-4 text-lg text-gray-200 max-w-2xl mx-auto">
              All supervised visitation and exchange services booked through
              SafeProvider are delivered by SafePair.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-surface-accent py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-accent-200 bg-surface-card p-8 md:p-12 shadow-sm">
            <div className="flex flex-col items-center text-center mb-8">
              <div className="rounded-full bg-surface-accent p-5 mb-6">
                <Image
                  src="/images/safepair-logo.png"
                  alt="SafePair — professional supervised visitation provider"
                  width={120}
                  height={120}
                  className="w-20 md:w-24 h-auto safepair-logo"
                />
              </div>
              <h2 className="text-3xl font-bold text-text-heading">
                SafePair&apos;s Mission
              </h2>
            </div>
            <div className="max-w-2xl mx-auto space-y-5">
              <p className="text-text-body text-lg leading-relaxed">
                At SafePair, our mission is to provide professional, reliable, and
                child-focused supervised visitation services that ensure families can
                maintain meaningful connections in a safe and neutral environment.
              </p>
              <p className="text-text-body text-lg leading-relaxed">
                We believe every child deserves a safe space to stay connected with
                their family, even during difficult times. Founded by{" "}
                <strong className="text-text-heading">Winston Franklin</strong>, a
                Certified Professional Supervised Visitation Provider based in
                Oakland, our work follows California&apos;s highest standards to
                ensure visits are always neutral, safe, and child-focused.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-text-heading text-center mb-8">
            What SafePair Provides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Home & Community Visits",
                desc: "Supervised visitation at home or within the community — wherever is safest and most comfortable for the child.",
                video: "/images/library-loop.mp4",
              },
              {
                title: "Reports to Parents & Courts",
                desc: "Detailed documentation provided to parents and/or courts after each visit or exchange.",
                video: "/images/clipboard-loop.mp4",
              },
              {
                title: "Witness Testimony",
                desc: "Witness testimonies provided as needed or requested by parents, attorneys, or courts.",
                video: "/images/father-daughter-loop.mp4",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-border-default bg-surface-card shadow-sm overflow-hidden"
              >
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-36 object-cover object-[center_35%]"
                >
                  <source src={item.video} type="video/mp4" />
                </video>
                <div className="p-5">
                  <h3 className="text-base font-semibold text-text-heading mb-2">
                    {item.title}
                  </h3>
                  <p className="text-text-body text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sexual Assault Specialization */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-border-default bg-surface-card p-8 md:p-10 shadow-sm">
            <h2 className="text-2xl font-bold text-text-heading mb-4">
              Emphasis on Sexual Assault Cases
            </h2>
            <p className="text-text-body leading-relaxed mb-4">
              While many supervised visitation providers do not accept cases
              involving sexual abuse or sexual assault, SafePair understands that
              these families still deserve access to safe, professional, and
              trauma-informed support.
            </p>
            <p className="text-text-body leading-relaxed">
              We are dedicated to providing specialized supervision in these
              highly sensitive situations, ensuring that children remain
              protected at all times while allowing contact only under strict
              professional oversight. With training, compliance, and compassion
              guiding our approach, we fill a critical gap in services and stand
              ready to help families facing the most challenging circumstances.
            </p>
          </div>
        </div>
      </section>

      {/* Low Income Program */}
      <section className="bg-surface-accent py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-text-heading mb-4">
            Low Income Program
          </h2>
          <p className="text-text-body leading-relaxed mb-6">
            Every family deserves access to safe, professional visitation
            services. We understand that costs can feel overwhelming, so SafePair
            offers a Low Income Program with discounted fees for families who
            qualify.
          </p>
          <p className="text-text-body leading-relaxed mb-8">
            Our goal is to make supervised visitation accessible and
            supportive — ensuring every child has the chance to stay connected
            with their family.
          </p>
          <div className="rounded-xl border border-border-default bg-surface-card p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-text-heading mb-3">
              Qualifications
            </h3>
            <ul className="space-y-2 text-text-body">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent-600 shrink-0" />
                Annual Gross Income (AGI) under $100,000 with documentation
                (statements, paystubs, etc.)
              </li>
            </ul>
            <p className="mt-4 text-sm text-text-muted">
              Fraud regarding low income status will be reported to the court and
              legal action will be taken.
            </p>
          </div>
        </div>
      </section>

      {/* Helpful Videos */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-text-heading mb-3">
            Helpful Videos
          </h2>
          <p className="text-text-muted mb-8">
            Understanding supervised visitation and co-parenting — for parents and families.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VIDEOS.map((v) => (
              <div key={v.embedId} className="rounded-xl border border-border-default bg-surface-card shadow-sm overflow-hidden">
                <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                  <iframe
                    src={`https://www.youtube.com/embed/${v.embedId}`}
                    title={v.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-text-heading">{v.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Family Guides */}
      <section className="bg-surface-subtle py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-text-heading mb-3">
            Guides for Your Family
          </h2>
          <p className="text-text-muted mb-8">
            California&apos;s Families Change program provides free, age-appropriate resources for every member of your family.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FAMILY_GUIDES.map((g) => (
              <a
                key={g.href}
                href={g.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-border-default bg-surface-card p-6 shadow-sm hover:bg-surface-card/80 hover:border-accent-600/30 transition-colors group"
              >
                <h3 className="text-base font-semibold text-text-heading mb-2 group-hover:text-accent-600 transition-colors">
                  {g.label}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">{g.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Court & Legal Resources */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-text-heading mb-6">
            Court &amp; Legal Resources
          </h2>
          <div className="space-y-3">
            {COURT_RESOURCES.map((r) => (
              <a
                key={r.href}
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-xl border border-border-default bg-surface-card p-4 shadow-sm hover:bg-surface-subtle transition-colors group"
              >
                <span className="text-text-heading font-medium text-sm md:text-base pr-4">
                  {r.label}
                </span>
                <span className="text-text-muted group-hover:text-accent-600 transition-colors shrink-0">
                  &rarr;
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-900 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-gray-200 mb-8 max-w-xl mx-auto">
            SafeProvider handles intake, scheduling, and payment. SafePair
            delivers the services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/start"
              className="inline-block rounded-lg bg-accent-600 px-8 py-3 text-base font-semibold text-white shadow-sm hover:bg-accent-500 transition-colors"
            >
              Start Intake
            </Link>
            <Link
              href="/contact"
              className="inline-block rounded-lg border border-white/30 px-8 py-3 text-base font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
