import Link from "next/link";
import Image from "next/image";
import { buildMetadata } from "@/lib/seo/metadata";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { faqSchema } from "@/lib/seo/schemas";
import { COUNTIES } from "@/lib/site-config";

export const metadata = buildMetadata({
  title: "Court-Ready Supervised Visitation With Fast Intake and Clear Documentation",
  description: "Neutral, child-focused supervision for high-conflict and high-risk matters. Response within 8 business hours.",
  path: "/for-attorneys",
});

const ATTORNEY_FAQ = [
  { question: "How do I refer a client?", answer: "Direct client to safeprovider.org/start or send details via contact page. We handle intake, scheduling, payment. SafePair handles delivery, documentation, testimony." },
  { question: "What turnaround can I tell my client?", answer: "3-7 business days from payment to first scheduled session." },
  { question: "Does SafePair provide reports and testimony?", answer: "Yes. Professional documentation and reports to parents and courts. Witness testimony when requested." },
];

const WE_HANDLE = [
  "Online intake processing",
  "Secure payment collection",
  "Scheduling coordination",
  "Attribution and case tracking",
  "Internal notifications to SafePair",
];

const WE_DO_NOT_HANDLE = [
  "Legal advice",
  "Court filings",
  "Custody evaluations",
  "Therapy or counseling",
  "Direct provider management",
];

const SAFEPAIR_HANDLES = [
  "Neutral supervision of visits and exchanges",
  "Professional documentation and reports",
  "Court testimony when requested",
  "Case acceptance or decline decisions",
  "Direct scheduling with families",
  "High-risk cases including sexual assault matters",
];

const liveCounties = COUNTIES.filter((c) => c.status === "live");

export default function ForAttorneysPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqSchema(ATTORNEY_FAQ) }}
      />

      {/* Hero with video */}
      <section className="relative bg-brand-900 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/images/attorney-review-2.webp"
          className="w-full h-64 sm:h-80 object-cover object-[center_35%] opacity-40"
        >
          <source src="/images/clipboard-loop.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-white max-w-3xl mx-auto">
              Court-Ready Supervised Visitation With Fast Intake and Clear Documentation
            </h1>
            <p className="mt-4 text-lg text-gray-200 max-w-2xl mx-auto">
              Neutral, child-focused supervision for high-conflict and high-risk matters. Response within 8 business hours.
            </p>
          </div>
        </div>
      </section>

      <div className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

          {/* SafeProvider handles vs does not handle */}
          <div className="mt-12 rounded-xl border border-brand-500/20 bg-white shadow-sm overflow-hidden">
            <div className="grid grid-cols-2">
              <div className="bg-brand-100 p-4 font-semibold text-brand-900 border-b border-brand-500/20">
                SafeProvider Handles
              </div>
              <div className="bg-brand-100 p-4 font-semibold text-brand-900 border-b border-brand-500/20">
                SafeProvider Does Not Handle
              </div>
              {WE_HANDLE.map((item, i) => (
                <div key={i} className="contents">
                  <div className="p-4 text-brand-700 border-b border-brand-500/10">
                    {item}
                  </div>
                  <div className="p-4 text-brand-700 border-b border-brand-500/10">
                    {WE_DO_NOT_HANDLE[i]}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SafePair handles — image integrated */}
          <div className="mt-8 rounded-xl border border-brand-500/20 bg-white shadow-sm overflow-hidden">
            <div className="flex flex-col sm:flex-row">
              <div className="shrink-0 sm:w-48">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster="/images/service-documentation.webp"
                  className="w-full h-40 sm:h-full object-cover object-[center_35%]"
                >
                  <source src="/images/clipboard-loop.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-brand-900 mb-4">SafePair Handles</h2>
                <ul className="space-y-2">
                  {SAFEPAIR_HANDLES.map((item, i) => (
                    <li key={i} className="text-brand-700 flex items-start gap-2">
                      <span className="text-accent-600 mt-1">&#10003;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Referral steps */}
          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-brand-900 text-center mb-8">How to Refer</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { step: "1", title: "Direct Your Client", desc: "Send your client to safeprovider.org/start or share referral details via our contact page." },
                { step: "2", title: "Client Completes Intake", desc: "Client completes intake and pays through the platform." },
                { step: "3", title: "SafePair Reviews", desc: "SafePair reviews and accepts the case independently." },
                { step: "4", title: "Scheduling Begins", desc: "SafePair contacts the client to schedule." },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="mx-auto w-10 h-10 rounded-full bg-accent-600 text-white flex items-center justify-center text-lg font-bold">
                    {item.step}
                  </div>
                  <h3 className="mt-3 text-base font-semibold text-brand-900">{item.title}</h3>
                  <p className="mt-1 text-sm text-brand-700">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* County quick-links */}
          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-brand-900 text-center mb-4">Counties We Serve</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {liveCounties.map((county) => (
                <Link
                  key={county.slug}
                  href={`/counties/${county.slug}`}
                  className="rounded-lg border border-brand-500/20 bg-white px-4 py-2 text-sm text-brand-700 hover:bg-brand-100 transition-colors"
                >
                  {county.name}
                </Link>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-brand-900 text-center mb-8">Attorney FAQ</h2>
            <FaqAccordion items={ATTORNEY_FAQ} />
          </div>

          <div className="mt-12 text-center flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="rounded-lg bg-accent-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-accent-500 transition-colors"
            >
              Send a Referral
            </Link>
            <Link
              href="/start"
              className="rounded-lg border border-brand-500/20 px-6 py-3 text-base font-semibold text-brand-900 hover:bg-brand-100 transition-colors"
            >
              Start Intake Now
            </Link>
          </div>
          <p className="mt-3 text-sm text-brand-500 text-center">
            Intake response within 8 business hours.
          </p>
        </div>
      </div>
    </>
  );
}
