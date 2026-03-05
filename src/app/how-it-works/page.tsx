import Link from "next/link";
import Image from "next/image";
import { buildMetadata } from "@/lib/seo/metadata";
import { howToSchema } from "@/lib/seo/schemas";

export const metadata = buildMetadata({
  title: "How Supervised Visitation Works in California — 5 Steps",
  description: "From online intake to your first supervised visit in 3-7 business days. Standard 5.20 compliant. See the 5-step process.",
  path: "/how-it-works",
});

const STEPS = [
  { step: "1", title: "Check Your Eligibility", desc: "You need a court order or stipulation requiring supervised visitation or custody exchange. If you are unsure, consult your attorney. You do not need a court order to start intake, but most families have one." },
  { step: "2", title: "Complete Intake", desc: "Fill out the intake form with your county, service type, family details, and contact information. About 5 minutes. Have your court order ready." },
  { step: "3", title: "Pay Securely", desc: "Pay the intake fee, first session fee, and platform fee through our secure checkout. Your total is calculated before you pay. No surprises." },
  { step: "4", title: "SafePair Reviews Your Case", desc: "SafePair reviews your case within 1-2 business days. This is not automatic. SafePair decides independently whether to accept based on their professional assessment." },
  { step: "5", title: "Scheduling Begins", desc: "Once accepted, SafePair contacts you to schedule. Typical time from payment to first session is 3-7 business days." },
];

const CHECKLIST = [
  "A valid government-issued photo ID for each adult",
  "Your court order or stipulation (if you have one)",
  "The other parent's full name and contact information",
  "Your preferred schedule and any date restrictions",
  "Any restraining orders or no-contact orders that apply",
  "Names and ages of all children involved",
];

export default function HowItWorksPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: howToSchema(STEPS.map(s => ({ name: s.title, text: s.desc }))) }}
      />

      {/* Hero banner */}
      <section className="relative bg-brand-900 overflow-hidden">
        <Image
          src="/images/hero-visitation.webp"
          alt="Parent and child playing a board game during a supervised visitation session"
          width={1400}
          height={500}
          className="w-full h-64 sm:h-80 object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-white max-w-3xl mx-auto">How It Works</h1>
            <p className="mt-4 text-lg text-gray-200 max-w-2xl mx-auto">
              From intake to your first scheduled visit in 5 clear steps.
            </p>
          </div>
        </div>
      </section>

    <div className="py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">

        <div className="mt-12 space-y-8">
          {STEPS.map((item) => (
            <div key={item.step} className="flex gap-4">
              <div className="shrink-0 w-10 h-10 rounded-full bg-accent-600 text-white flex items-center justify-center font-bold">
                {item.step}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-brand-900">{item.title}</h2>
                <p className="mt-1 text-brand-700">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Process steps graphic */}
        <div className="mt-12">
          <Image
            src="/images/process-steps.webp"
            alt="5-step process: intake form, calendar scheduling, meeting, supervised activity, documentation report"
            width={1000}
            height={250}
            className="w-full rounded-xl"
          />
        </div>

        {/* Standard 5.20 Block with trust badges */}
        <div className="mt-12 rounded-xl bg-brand-100 p-6">
          <h2 className="text-xl font-semibold text-brand-900 mb-3">What Does California Standard 5.20 Mean for You?</h2>
          <p className="text-brand-700">
            It means the person supervising your visit has passed a criminal background check, completed mandated training on child safety and domestic violence, and follows court-defined rules for neutrality, confidentiality, and documentation. It is the standard family courts use to verify provider qualifications.
          </p>
          <div className="mt-4">
            <Image
              src="/images/trust-icons.webp"
              alt="Trust icons: background checks, certified training, strict confidentiality, neutral supervision, flexible scheduling, court-ready documentation"
              width={800}
              height={200}
              className="w-full rounded-lg"
            />
          </div>
        </div>

        {/* What to have ready */}
        <div className="mt-12 rounded-xl border border-brand-500/20 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-brand-900 mb-4">What to Have Ready</h2>
          <ol className="space-y-2">
            {CHECKLIST.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-brand-700">
                <span className="shrink-0 w-6 h-6 rounded-full bg-brand-100 text-brand-900 flex items-center justify-center text-sm font-semibold">{i + 1}</span>
                {item}
              </li>
            ))}
          </ol>
        </div>

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
