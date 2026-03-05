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
      {/* Hero — full-width safepair-hero image with logo overlay */}
      <section className="relative bg-brand-900 overflow-hidden">
        <Image
          src="/images/safepair-hero.avif"
          alt="Family walking together — SafePair supervised visitation"
          width={1920}
          height={600}
          className="absolute inset-0 w-full h-full object-cover object-[center_40%] opacity-25"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-900/60 via-brand-900/20 to-brand-900/30" />
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-20 sm:py-24 md:py-28 lg:py-36">
          <Image
            src="/images/safepair-logo-transparent.webp"
            alt="SafePair"
            width={160}
            height={160}
            className="w-28 sm:w-32 md:w-36 lg:w-40 h-auto mb-8 invert"
          />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Our Provider Partner
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed">
            All supervised visitation and exchange services booked through
            SafeProvider are delivered by SafePair.
          </p>
        </div>
      </section>

      {/* Mission — warm teal accent background, wider content */}
      <section className="bg-surface-accent py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-3">
              <h2 className="text-3xl sm:text-4xl font-bold text-text-heading mb-6">
                SafePair&apos;s Mission
              </h2>
              <p className="text-text-body text-lg leading-relaxed mb-5">
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
            <div className="lg:col-span-2">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full aspect-square rounded-2xl object-cover object-[center_35%] shadow-lg"
              >
                <source src="/images/mother-child-reading-loop.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* Services — wider cards with video headers */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-heading text-center mb-4">
            What SafePair Provides
          </h2>
          <p className="text-text-muted text-center max-w-2xl mx-auto mb-12">
            Professional, court-compliant services delivered with care and compassion.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Home & Community Visits",
                desc: "Supervised visitation at home or within the community — wherever is safest and most comfortable for the child.",
                video: "/images/visitation-loop.mp4",
                alt: "Father and child during supervised visit",
              },
              {
                title: "Reports to Parents & Courts",
                desc: "Detailed documentation provided to parents and/or courts after each visit or exchange.",
                video: "/images/library-loop.mp4",
                alt: "Professional documentation for court reports",
              },
              {
                title: "Witness Testimony",
                desc: "Witness testimonies provided as needed or requested by parents, attorneys, or courts.",
                video: "/images/father-daughter-loop.mp4",
                alt: "Professional supervision during family visit",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-border-default bg-surface-card shadow-sm overflow-hidden"
              >
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-48 object-cover object-[center_35%]"
                >
                  <source src={item.video} type="video/mp4" />
                </video>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-text-heading mb-2">
                    {item.title}
                  </h3>
                  <p className="text-text-body text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sexual Assault Specialization — subtle warm background */}
      <section className="bg-surface-subtle py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
            <div className="lg:col-span-3 order-2 lg:order-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-text-heading mb-5">
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
            <div className="lg:col-span-2 order-1 lg:order-2">
              <Image
                src="/images/service-visitation.webp"
                alt="Safe, professional supervised visitation environment"
                width={500}
                height={500}
                className="w-full aspect-square rounded-2xl object-cover object-[center_35%] shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Low Income Program — accent background */}
      <section className="bg-surface-accent py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-text-heading mb-4">
                Low Income Program
              </h2>
              <p className="text-text-body leading-relaxed mb-5">
                Every family deserves access to safe, professional visitation
                services. We understand that costs can feel overwhelming, so SafePair
                offers a Low Income Program with discounted fees for families who
                qualify.
              </p>
              <p className="text-text-body leading-relaxed">
                Our goal is to make supervised visitation accessible and
                supportive — ensuring every child has the chance to stay connected
                with their family.
              </p>
            </div>
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
        </div>
      </section>

      {/* Helpful Videos */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-heading mb-3">
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

      {/* Family Guides — subtle background */}
      <section className="bg-surface-subtle py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-heading mb-3">
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
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-heading mb-6">
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

      {/* CTA — full-width dark */}
      <section className="bg-brand-900 py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
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
