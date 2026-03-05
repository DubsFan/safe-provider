import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: "Privacy policy for Safe Provider.",
  path: "/privacy",
  noindex: true,
});

export default function PrivacyPage() {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-brand-900">Privacy Policy</h1>
        <p className="mt-2 text-sm text-brand-500">Last updated: March 2026</p>

        <div className="mt-8 space-y-8 text-brand-700">
          <p>
            Safe Provider (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates the SafeProvider website at safeprovider.org.
            This Privacy Policy explains how we collect, use, and protect your personal information.
          </p>

          <section>
            <h2 className="text-2xl font-semibold text-brand-900 mb-3">1. Information We Collect</h2>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Identifiers:</strong> Full name, email address, phone number</li>
              <li><strong>Family details:</strong> Other parent&apos;s name, number of adults, children&apos;s names and ages</li>
              <li><strong>Court information:</strong> Court order status, court order notes, county</li>
              <li><strong>Service selection:</strong> County, service type (visitation or exchange), preferred schedule</li>
              <li><strong>Payment information:</strong> Processed directly by Stripe — we never store card numbers, CVVs, or full payment details</li>
              <li><strong>Technical data:</strong> IP address, browser type, device type, pages visited, UTM/referral parameters</li>
              <li><strong>Communications:</strong> Any emails or messages you send us</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-brand-900 mb-3">2. How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Process your intake form and create your case file</li>
              <li>Calculate pricing and create a Stripe checkout session</li>
              <li>Send your case to SafePair for independent review and acceptance</li>
              <li>Communicate with you about your case status (via Resend email service)</li>
              <li>Send admin notifications to our team when a new case is submitted</li>
              <li>Track anonymous analytics to improve the intake experience</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-brand-900 mb-3">3. Who We Share With</h2>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>SafePair</strong> — your intake details are shared with SafePair so they can review your case, decide whether to accept, and schedule services. SafePair is a separate entity.</li>
              <li><strong>Stripe</strong> — payment processing. Stripe&apos;s privacy policy governs payment data.</li>
              <li><strong>Resend</strong> — transactional email delivery only.</li>
              <li><strong>Vercel</strong> — website hosting. Server logs may include IP addresses.</li>
              <li><strong>Supabase</strong> — secure database hosting with row-level security.</li>
            </ul>
            <p className="mt-4 font-semibold">
              We do not sell your personal information. We do not share your information for advertising or marketing by third parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-brand-900 mb-3">4. Data Retention</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Intake and case records retained for the duration of services plus 7 years, consistent with California recordkeeping requirements for family services.</li>
              <li>Analytics data (anonymized) retained indefinitely.</li>
              <li>You may request deletion at any time (see Your Rights below).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-brand-900 mb-3">5. Your California Privacy Rights (CCPA)</h2>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Right to Know:</strong> You can request what personal information we have collected about you.</li>
              <li><strong>Right to Delete:</strong> You can request deletion of your personal information, subject to legal exceptions.</li>
              <li><strong>Right to Opt-Out of Sale:</strong> We do not sell personal information. No opt-out is necessary.</li>
              <li><strong>Right to Non-Discrimination:</strong> We will not deny services or charge different prices based on exercising your rights.</li>
            </ul>
            <p className="mt-4">
              To exercise any right, <a href="mailto:gg@oog.life?subject=Privacy%20Request" className="text-accent-600 hover:text-accent-500">send us an email</a> with subject line &quot;Privacy Request.&quot;
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-brand-900 mb-3">6. Security</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>All data transmitted over HTTPS/TLS encryption</li>
              <li>Database protected by Supabase row-level security policies</li>
              <li>Payment processing handled by Stripe (PCI DSS Level 1 compliant)</li>
              <li>Service-role keys are server-side only, never exposed to browsers</li>
              <li>Admin access requires authentication</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-brand-900 mb-3">7. Children&apos;s Privacy</h2>
            <p>
              SafeProvider collects children&apos;s names and ages as part of intake for supervised visitation services. This information is collected from the parent or guardian, not from the child directly. We do not knowingly collect information directly from children under 13.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-brand-900 mb-3">8. Changes to This Policy</h2>
            <p>
              We may update this policy. Changes will be posted on this page with an updated date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-brand-900 mb-3">9. Contact</h2>
            <p>
              <a href="mailto:gg@oog.life?subject=Privacy%20Request" className="text-accent-600 hover:text-accent-500">Send us an email</a>
            </p>
            <p>Subject line: &quot;Privacy Request&quot;</p>
          </section>
        </div>
      </div>
    </div>
  );
}
