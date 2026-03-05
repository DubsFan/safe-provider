import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Terms of Service",
  description: "Terms of service for Safe Provider.",
  path: "/terms",
  noindex: true,
});

export default function TermsPage() {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-text-heading">Terms of Service</h1>
        <p className="mt-2 text-sm text-text-muted">Last updated: March 2026</p>

        <div className="mt-8 space-y-8 text-text-body">
          <section>
            <h2 className="text-2xl font-semibold text-text-heading mb-3">1. Acceptance of Terms</h2>
            <p>
              By using safeprovider.org, you agree to these Terms of Service. If you do not agree, do not use this website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-heading mb-3">2. What SafeProvider Is</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>SafeProvider is an online intake, scheduling, and payment platform for supervised visitation and custody exchange services.</li>
              <li>SafeProvider is operated by Safe Provider.</li>
              <li>SafeProvider is NOT a law firm. SafeProvider does NOT provide legal advice.</li>
              <li>SafeProvider is NOT the court-listed supervised visitation provider. SafeProvider does NOT deliver supervised visitation or custody exchange services.</li>
              <li>SafeProvider is NOT affiliated with any court, government agency, or judicial body.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-heading mb-3">3. What SafeProvider Does</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Processes online intake forms</li>
              <li>Collects payment securely via Stripe</li>
              <li>Coordinates scheduling between families and SafePair</li>
              <li>Tracks cases and sends notifications</li>
              <li>Provides customer support for intake and payment questions</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-heading mb-3">4. What SafeProvider Does Not Do</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Provide legal advice or court filings</li>
              <li>Conduct custody evaluations</li>
              <li>Provide therapy, counseling, or mediation</li>
              <li>Directly manage or supervise visitation or exchange sessions</li>
              <li>Make case acceptance or decline decisions</li>
              <li>Guarantee provider availability or scheduling</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-heading mb-3">5. Service Delivery</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>All supervised visitation and supervised exchange services are delivered by SafePair, a separate and independent professional supervised visitation provider.</li>
              <li>SafePair independently reviews and decides whether to accept each case based on their professional assessment and capacity.</li>
              <li>SafeProvider does not control SafePair&apos;s acceptance decisions, scheduling, or service delivery.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-heading mb-3">6. Payment Terms</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Payment is collected at the time of intake via Stripe Checkout.</li>
              <li>The SafeProvider platform fee is $99 per case. This covers intake processing, scheduling coordination, and payment handling.</li>
              <li>Provider fees (intake, hourly visitation, exchange) are set by SafePair and listed on the Santa Clara County court provider list.</li>
              <li>Payment does not guarantee provider acceptance. SafePair reviews every case independently.</li>
              <li>All prices are in US dollars.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-heading mb-3">7. Refund Policy</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>If SafePair declines your case, you receive a full refund of all fees paid.</li>
              <li>Once SafePair accepts your case and services begin, refunds follow SafePair&apos;s cancellation policy.</li>
              <li>The SafeProvider platform fee is non-refundable once services have begun.</li>
              <li>Refunds are processed to the original payment method via Stripe.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-heading mb-3">8. User Responsibilities</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>You agree to provide accurate and truthful information in your intake form.</li>
              <li>You agree to comply with your court order and any conditions set by SafePair.</li>
              <li>You are responsible for attending scheduled sessions on time.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-heading mb-3">9. Limitation of Liability</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>SafeProvider is an intake and scheduling platform only. SafeProvider is not liable for the quality, outcome, or conduct of supervised visitation or exchange services delivered by SafePair.</li>
              <li>SafeProvider is not liable for SafePair&apos;s acceptance or decline of any case.</li>
              <li>To the maximum extent permitted by law, SafeProvider&apos;s total liability is limited to the amount you paid through the platform.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-heading mb-3">10. Dispute Resolution</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Any disputes arising from these Terms shall be resolved under the laws of the State of California.</li>
              <li>Venue for any legal proceedings shall be in Santa Clara County, California.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-heading mb-3">11. Changes to Terms</h2>
            <p>
              We may update these Terms. Continued use of the site after changes constitutes acceptance.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-heading mb-3">12. Contact</h2>
            <p>
              <a href="mailto:gg@oog.life" className="text-accent-600 hover:text-accent-500">Send us an email</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
