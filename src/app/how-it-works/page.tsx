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
          poster="/images/library-poster.webp"
          className="w-full h-64 sm:h-80 object-cover object-[center_35%] opacity-40"
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

      {/* Steps with process graphic integrated */}
      <div className="py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Left: Steps */}
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-text-heading mb-2">The 5 Steps</h2>
              <p className="text-text-muted mb-8">
                Each step moves you forward without surprises. Read through them, then start when you&apos;re ready.
              </p>

              <div className="space-y-8">
                {STEPS.map((item, idx) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="shrink-0 flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-accent-600 text-white flex items-center justify-center font-bold">
                        {item.step}
                      </div>
                      {idx < STEPS.length - 1 && (
                        <div className="w-px flex-1 bg-border-default mt-2" />
                      )}
                    </div>
                    <div className="pb-2">
                      <h3 className="text-lg font-semibold text-text-heading">{item.title}</h3>
                      <p className="mt-1 text-sm text-text-body">{item.desc}</p>
                      {"link" in item && item.link && (
                        <Link href={item.link} className="mt-2 inline-block text-sm font-semibold text-accent-600 hover:text-accent-500">
                          {item.linkLabel} &rarr;
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Sticky sidebar with images */}
            <div className="lg:w-80 shrink-0">
              <div className="lg:sticky lg:top-24 space-y-6">
                {/* Process graphic */}
                <div className="rounded-xl border border-border-default bg-surface-card p-4 shadow-sm">
                  <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Your Journey</p>
                  <Image
                    src="/images/process-steps.webp"
                    alt="5-step visual: intake form, calendar scheduling, intake meeting, supervised visit activity, documentation report"
                    width={720}
                    height={180}
                    className="w-full rounded-lg"
                  />
                  <div className="mt-3 flex justify-between text-[10px] text-text-muted font-medium">
                    <span>Intake</span>
                    <span>Schedule</span>
                    <span>Meet</span>
                    <span>Visit</span>
                    <span>Docs</span>
                  </div>
                </div>

                {/* Visit preview video */}
                <div className="rounded-xl overflow-hidden shadow-sm">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster="/images/hero-visitation.webp"
                    className="w-full h-48 object-cover object-[center_35%]"
                  >
                    <source src="/images/visitation-loop.mp4" type="video/mp4" />
                  </video>
                  <div className="bg-surface-subtle p-4">
                    <p className="text-xs text-text-body">SafePair reviews every case independently within 1-2 business days before accepting.</p>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Compliance section */}
          <div className="mt-16 rounded-xl bg-surface-muted p-6 flex flex-col sm:flex-row gap-6 items-start">
            <Image
              src="/images/secure-entrance.webp"
              alt="Secure entrance to supervised visitation facility"
              width={400}
              height={224}
              className="shrink-0 w-full sm:w-48 h-32 sm:h-full rounded-lg object-cover object-[center_35%]"
            />
            <div>
              <h2 className="text-xl font-semibold text-text-heading mb-3">What Does California Standard 5.20 Mean for You?</h2>
              <p className="text-text-body">
                It means the person supervising your visit has passed a criminal background check, completed mandated training on child safety and domestic violence, and follows court-defined rules for neutrality, confidentiality, and documentation. It is the standard family courts use to verify provider qualifications.
              </p>
            </div>
          </div>

          {/* Checklist with image */}
          <div className="mt-12 rounded-xl border border-border-default bg-surface-card shadow-sm overflow-hidden">
            <div className="flex flex-col sm:flex-row">
              <div className="shrink-0 sm:w-48">
                <Image
                  src="/images/intake-flatlay.webp"
                  alt="Notebook, pen, and ID badge on a desk — ready for intake"
                  width={200}
                  height={300}
                  className="w-full h-40 sm:h-full object-cover object-[center_35%]"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-text-heading mb-4">What to Have Ready</h2>
                <ol className="space-y-2">
                  {CHECKLIST.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-text-body">
                      <span className="shrink-0 w-6 h-6 rounded-full bg-surface-muted text-text-heading flex items-center justify-center text-sm font-semibold">{i + 1}</span>
                      {item}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <div className="mt-16 text-center">
            <p className="text-text-body mb-6 max-w-md mx-auto">
              The intake form takes about 5 minutes. You&apos;ll see your total cost before you pay, and SafePair will review your case within 1-2 business days.
            </p>
            <Link
              href="/start"
              className="rounded-lg bg-accent-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-accent-500 transition-colors"
            >
              Start Intake
            </Link>
            <p className="mt-3 text-sm text-text-muted">
              Get an intake response within 8 hours or by the end of the business day.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
