import Link from "next/link";
import Image from "next/image";
import { buildMetadata } from "@/lib/seo/metadata";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { faqSchema } from "@/lib/seo/schemas";

export const metadata = buildMetadata({
  title: "Supervised Visitation FAQ — Cost, Process & Requirements",
  description: "Cost, timeline, court orders, refunds, high-risk cases — answers to every question about supervised visitation and custody exchange intake.",
  path: "/faq",
});

const COST_FAQ = [
  { question: "How much does supervised visitation cost?", answer: "Intake is $50 per person. Supervised visitation is $70 per hour with a 2-hour minimum. A platform scheduling fee of $99 applies to each case booked through SafeProvider. For a typical first visit with two parents and one child, the total is $339. See our pricing page for full details." },
  { question: "How much does supervised exchange cost?", answer: "Intake is $50 per person. Each supervised exchange is $70. A platform scheduling fee of $99 applies. For a typical first exchange with two parents, the total is $269." },
  { question: "Are there additional fees for more children?", answer: "SafePair charges a flat $50 per additional child. This is not per hour. Ask during intake for exact pricing for your family." },
  { question: "Is there a sliding scale or low-income option?", answer: "Yes. SafePair offers sliding-scale rates for qualifying families. Ask about eligibility during intake." },
  { question: "Where does the $99 platform fee go?", answer: "The $99 SafeProvider platform fee covers intake processing, scheduling coordination, secure payment handling, and case tracking. It is separate from SafePair's provider fees." },
];

const PROCESS_FAQ = [
  { question: "How long does it take to get started?", answer: "After intake and payment, SafePair reviews your case within 1-2 business days. If accepted, scheduling begins within 3-5 business days. Total: 3-7 business days from intake to first session." },
  { question: "What happens after I pay?", answer: "Payment reserves your intake slot and triggers case review. SafePair reviews independently. If accepted, they contact you to schedule. If declined, full refund." },
  { question: "Do I need a court order?", answer: "Not required to start intake. Most families have one. If unsure, consult your attorney." },
  { question: "What documents do I need?", answer: "Government-issued photo ID for each adult, court order or stipulation (if applicable), other parent's contact information, preferred schedule, any restraining or no-contact orders, names and ages of all children." },
  { question: "What if SafePair declines my case?", answer: "Full refund of all fees. SafePair reviews every case independently based on professional assessment and capacity." },
];

const TRUST_FAQ = [
  { question: "Who is the provider?", answer: "SafePair, a professional supervised visitation provider based in Oakland, CA. Operates in compliance with California Family Code Section 3200.5 and Standard 5.20, requiring Live Scan background checks and mandated training." },
  { question: "Is this a law firm?", answer: "No. SafeProvider manages intake, scheduling, and payment only. We do not provide legal advice. Services delivered by SafePair." },
  { question: "What does \"neutral third party\" mean?", answer: "Standard 5.20 defines supervised visitation as contact in the presence of a neutral third person. The monitor does not take sides, does not give custody opinions, and follows your court order rules." },
  { question: "Does SafePair handle high-risk or sexual assault cases?", answer: "Yes. SafePair provides specialized supervision for highly sensitive cases, including sexual abuse and assault matters, under strict professional oversight. Many providers do not accept these cases. SafePair does." },
  { question: "Can I get a refund?", answer: "If SafePair declines your case, full refund. Once services begin, refunds follow SafePair's cancellation policy." },
];

const ATTORNEY_FAQ = [
  { question: "How do I refer a client?", answer: "Direct client to safeprovider.org/start or send details via contact page. We handle intake, scheduling, payment. SafePair handles delivery, documentation, testimony." },
  { question: "What turnaround can I tell my client?", answer: "3-7 business days from payment to first scheduled session." },
  { question: "Does SafePair provide reports and testimony?", answer: "Yes. Professional documentation and reports to parents and courts. Witness testimony when requested." },
];

const ALL_FAQ = [...COST_FAQ, ...PROCESS_FAQ, ...TRUST_FAQ, ...ATTORNEY_FAQ];

const SECTIONS = [
  {
    title: "Cost and Pricing",
    items: COST_FAQ,
    link: "/pricing",
    linkLabel: "See full pricing",
    image: { src: "/images/service-visitation.webp", alt: "Father and daughter reading at a library during a supervised visit" },
  },
  {
    title: "Process",
    items: PROCESS_FAQ,
    link: "/how-it-works",
    linkLabel: "See 5-step process",
    image: { src: "/images/process-steps.webp", alt: "5-step intake to visit process" },
  },
  {
    title: "Trust and Safety",
    items: TRUST_FAQ,
    link: "/counties",
    linkLabel: "View counties",
    image: { src: "/images/trust-compliance.webp", alt: "Four compliance pillars: background checks, training, confidentiality, neutral supervision" },
  },
  {
    title: "For Attorneys",
    items: ATTORNEY_FAQ,
    link: "/for-attorneys",
    linkLabel: "Attorney resources",
    image: { src: "/images/attorney-review-2.webp", alt: "Professional reviewing court documents" },
  },
];

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqSchema(ALL_FAQ) }}
      />

      {/* Hero banner */}
      <section className="relative bg-brand-900 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/images/virtual-visit-boy.webp"
          className="w-full h-64 sm:h-80 object-cover object-[center_30%] opacity-40"
        >
          <source src="/images/visitation-loop.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-white max-w-3xl mx-auto">Frequently Asked Questions</h1>
            <p className="mt-4 text-lg text-gray-200 max-w-2xl mx-auto">
              Everything you need to know about supervised visitation and exchange intake.
            </p>
          </div>
        </div>
      </section>

      <div className="py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

          {/* FAQ sections — each with image header */}
          <div className="space-y-16">
            {SECTIONS.map((section, idx) => (
              <div key={section.title}>
                {/* Section header with image */}
                <div className={`flex flex-col sm:flex-row gap-6 items-center mb-6 ${idx % 2 === 1 ? "sm:flex-row-reverse" : ""}`}>
                  <div className="shrink-0 w-full sm:w-56">
                    <Image
                      src={section.image.src}
                      alt={section.image.alt}
                      width={224}
                      height={150}
                      className="w-full h-36 object-cover rounded-xl shadow-sm"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline justify-between mb-1">
                      <h2 className="text-xl font-semibold text-brand-900">{section.title}</h2>
                      <Link href={section.link} className="text-sm font-semibold text-accent-600 hover:text-accent-500 hidden sm:inline">
                        {section.linkLabel} &rarr;
                      </Link>
                    </div>
                    <p className="text-sm text-brand-600">
                      {section.items.length} questions answered
                    </p>
                    <Link href={section.link} className="text-sm font-semibold text-accent-600 hover:text-accent-500 sm:hidden mt-1 inline-block">
                      {section.linkLabel} &rarr;
                    </Link>
                  </div>
                </div>

                {/* Accordion */}
                <FaqAccordion items={section.items} />
              </div>
            ))}
          </div>

          {/* Still have questions — with provider image */}
          <div className="mt-16 rounded-xl bg-brand-50 overflow-hidden">
            <div className="flex flex-col sm:flex-row">
              <div className="shrink-0 sm:w-56">
                <Image
                  src="/images/provider-review.webp"
                  alt="SafePair provider reviewing case documentation"
                  width={224}
                  height={280}
                  className="w-full h-44 sm:h-full object-cover object-top"
                />
              </div>
              <div className="p-6 flex flex-col justify-center">
                <h2 className="text-xl font-semibold text-brand-900 mb-2">Still Have Questions?</h2>
                <p className="text-brand-700 mb-4">
                  Every family&apos;s situation is different. If your question isn&apos;t answered above, reach out directly — we respond within 8 business hours.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link href="/contact" className="rounded-lg bg-accent-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-accent-500 transition-colors">
                    Contact Us
                  </Link>
                  <Link href="/start" className="rounded-lg border border-brand-500/20 px-5 py-2.5 text-sm font-semibold text-brand-900 hover:bg-brand-100 transition-colors">
                    Start Intake
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
