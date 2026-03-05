import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Notice at Collection",
  description: "Notice at collection for Safe Provider.",
  path: "/notice-at-collection",
  noindex: true,
});

export default function NoticeAtCollectionPage() {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-brand-900">Notice at Collection</h1>
        <p className="mt-2 text-sm text-brand-500">Last updated: March 2026</p>

        <div className="mt-8 space-y-8 text-brand-700">
          <section>
            <h2 className="text-2xl font-semibold text-brand-900 mb-3">1. Who We Are</h2>
            <p>
              Safe Provider (&quot;SafeProvider&quot;) operates safeprovider.org, an online intake and scheduling platform for supervised visitation and custody exchange services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-brand-900 mb-3">2. Categories of Personal Information We Collect</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-brand-100">
                    <th className="border border-brand-500/20 px-4 py-2 text-left font-semibold text-brand-900">Category</th>
                    <th className="border border-brand-500/20 px-4 py-2 text-left font-semibold text-brand-900">Examples</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-brand-500/20 px-4 py-2">Identifiers</td>
                    <td className="border border-brand-500/20 px-4 py-2">Name, email address, phone number</td>
                  </tr>
                  <tr className="bg-brand-100/50">
                    <td className="border border-brand-500/20 px-4 py-2">Commercial information</td>
                    <td className="border border-brand-500/20 px-4 py-2">Payment records, transaction history, fees paid</td>
                  </tr>
                  <tr>
                    <td className="border border-brand-500/20 px-4 py-2">Internet or electronic activity</td>
                    <td className="border border-brand-500/20 px-4 py-2">IP address, browser type, pages visited, UTM parameters</td>
                  </tr>
                  <tr className="bg-brand-100/50">
                    <td className="border border-brand-500/20 px-4 py-2">Professional or employment-related</td>
                    <td className="border border-brand-500/20 px-4 py-2">Court order status, court order notes, county jurisdiction</td>
                  </tr>
                  <tr>
                    <td className="border border-brand-500/20 px-4 py-2">Family information</td>
                    <td className="border border-brand-500/20 px-4 py-2">Other parent&apos;s name, children&apos;s names and ages, number of adults</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-brand-900 mb-3">3. Purpose of Collection</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Process supervised visitation and exchange intake forms</li>
              <li>Calculate pricing and process payment via Stripe</li>
              <li>Share intake details with SafePair for case review</li>
              <li>Communicate about case status</li>
              <li>Improve the intake experience through analytics</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-brand-900 mb-3">4. Categories of Third Parties Who Receive Your Information</h2>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>SafePair</strong> — service delivery partner (case review, scheduling, supervision)</li>
              <li><strong>Stripe</strong> — payment processing</li>
              <li><strong>Resend</strong> — email delivery</li>
              <li><strong>Vercel</strong> — website hosting</li>
              <li><strong>Supabase</strong> — database hosting</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-brand-900 mb-3">5. Sale and Sharing</h2>
            <p className="font-semibold">We do NOT sell your personal information.</p>
            <p className="mt-2 font-semibold">We do NOT share your personal information for cross-context behavioral advertising.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-brand-900 mb-3">6. Retention</h2>
            <p>
              Personal information is retained for the duration of services plus 7 years, consistent with California recordkeeping requirements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-brand-900 mb-3">7. Your Rights Under the CCPA</h2>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Right to Know</strong> what personal information we collect, use, and share</li>
              <li><strong>Right to Delete</strong> your personal information</li>
              <li><strong>Right to Opt-Out of Sale</strong> (we do not sell — no action needed)</li>
              <li><strong>Right to Non-Discrimination</strong> for exercising your rights</li>
              <li><strong>Right to Correct</strong> inaccurate personal information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-brand-900 mb-3">8. How to Exercise Your Rights</h2>
            <ul className="list-disc list-inside space-y-2">
              <li><a href="mailto:gg@oog.life?subject=CCPA%20Request" className="text-accent-600 hover:text-accent-500">Send us an email</a> with subject line &quot;CCPA Request&quot;</li>
              <li>We will verify your identity before processing any request</li>
              <li>We will respond within 45 days as required by law</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
