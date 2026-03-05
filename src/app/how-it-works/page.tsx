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
  { step: "1", title: "Check Your Eligibility", desc: "You need a court order or stipulation requiring supervised visitation or custody exchange. If you are unsure, consult your attorney. You do not need a court order to start intake, but most families have one.", link: "/faq", linkLabel: "See FAQ" },
  { step: "2", title: "Complete Intake", desc: "Fill out the intake form with your county, service type, family details, and contact information. About 5 minutes. Have your court order ready.", link: "/start", linkLabel: "Start intake" },
  { step: "3", title: "Pay Securely", desc: "Pay the intake fee, first session fee, and platform fee through our secure checkout. Your total is calculated before you pay. No surprises.", link: "/pricing", linkLabel: "See pricing" },
  { step: "4", title: "SafePair Reviews Your Case", desc: "SafePair reviews your case within 1-2 business days. This is not automatic. SafePair decides independently whether to accept based on their professional assessment." },
  { step: "5", title: "Scheduling Begins", desc: "Once accepted, SafePair contacts you to schedule. Typical time from payment to first session is 3-7 business days.", link: "/contact", linkLabel: "Questions? Contact us" },
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
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/images/father-son-library.webp"
          className="w-full h-64 sm:h-80 object-cover object-[center_25%] opacity-40"
        >
          <source src="/images/library-loop.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-white max-w-3xl mx-auto">How It Works</h1>
            <p className="mt-4 text-lg text-gray-200 max-w-2xl mx-auto">
              From intake to your first scheduled visit in 5 clear steps.
            </p>
          </div>
        </div>
      </section>

    {/* At a glance — process graphic with intro copy */}
    <section className="bg-brand-50 py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-xl font-semibold text-brand-900 mb-2">Your Journey at a Glance</h2>
        <p className="text-brand-600 text-sm mb-6">
          From your first click to your child&apos;s first supervised visit — here&apos;s the full path.
        </p>
        <Image
          src="/images/process-steps.webp"
          alt="5-step visual: intake form, calendar scheduling, intake meeting, supervised visit activity, documentation report"
          width={720}
          height={180}
          className="w-full max-w-xl mx-auto rounded-xl"
        />
        <p className="mt-4 text-xs text-brand-400">
          Intake &rarr; Scheduling &rarr; Meeting &rarr; Visit &rarr; Documentation
        </p>
      </div>
    </section>

    {/* Detailed steps */}
    <div className="py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">

        <h2 className="text-2xl font-semibold text-brand-900 text-center mb-4">The 5 Steps in Detail</h2>
        <p className="text-brand-600 text-center mb-12 max-w-xl mx-auto">
          Each step is designed to move you forward without surprises. Read through them, then start when you&apos;re ready.
        </p>

        <div className="space-y-10">
          {STEPS.map((item, idx) => (
            <div key={item.step} className="flex gap-5">
              <div className="shrink-0 flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-accent-600 text-white flex items-center justify-center font-bold">
                  {item.step}
                </div>
                {idx < STEPS.length - 1 && (
                  <div className="w-px flex-1 bg-brand-200 mt-2" />
                )}
              </div>
              <div className="pb-2">
                <h3 className="text-xl font-semibold text-brand-900">{item.title}</h3>
                <p className="mt-1 text-brand-700">{item.desc}</p>
                {"link" in item && item.link && (
                  <Link href={item.link} className="mt-2 inline-block text-sm font-semibold text-accent-600 hover:text-accent-500">
                    {item.linkLabel} &rarr;
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Transition copy into compliance section */}
        <div className="mt-16 text-center">
          <p className="text-brand-600 max-w-xl mx-auto">
            Every step above follows California&apos;s rules for supervised visitation providers. Here&apos;s what that means for your family.
          </p>
        </div>

        {/* Standard 5.20 */}
        <div className="mt-6 rounded-xl bg-brand-100 p-6">
          <h2 className="text-xl font-semibold text-brand-900 mb-3">What Does California Standard 5.20 Mean for You?</h2>
          <p className="text-brand-700">
            It means the person supervising your visit has passed a criminal background check, completed mandated training on child safety and domestic violence, and follows court-defined rules for neutrality, confidentiality, and documentation. It is the standard family courts use to verify provider qualifications.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {["Background Checks", "Certified Training", "Strict Confidentiality", "Neutral Supervision", "Flexible Scheduling", "Court-Ready Docs"].map((label) => (
              <span key={label} className="rounded-full bg-white px-3 py-1 text-xs font-medium text-brand-700 shadow-sm">
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Transition into checklist */}
        <div className="mt-16 text-center">
          <p className="text-brand-600 max-w-xl mx-auto">
            Before you begin intake, gather these items. Having them ready makes the process faster.
          </p>
        </div>

        {/* What to have ready */}
        <div className="mt-6 rounded-xl border border-brand-500/20 bg-white p-6 shadow-sm">
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

        {/* Final CTA with reassurance */}
        <div className="mt-16 text-center">
          <p className="text-brand-700 mb-6 max-w-md mx-auto">
            The intake form takes about 5 minutes. You&apos;ll see your total cost before you pay, and SafePair will review your case within 1-2 business days.
          </p>
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
