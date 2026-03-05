import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import { CheckCircle } from "lucide-react";

export const metadata = buildMetadata({
  title: "Payment Received",
  description: "Your payment has been received.",
  path: "/checkout/success",
  noindex: true,
});

export default function CheckoutSuccessPage() {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
        <CheckCircle className="mx-auto h-16 w-16 text-success" />
        <h1 className="mt-6 text-4xl font-bold text-text-heading">Payment Received</h1>
        <p className="mt-4 text-lg text-text-body">
          Your payment has been received. SafePair will review your case within 1-2 business days. You will receive a call or email to confirm scheduling.
        </p>

        <div className="mt-8 rounded-xl border border-border-default bg-surface-card p-6 shadow-sm text-left">
          <h2 className="text-lg font-semibold text-text-heading mb-4">What Happens Next</h2>
          <ol className="list-decimal list-inside space-y-2 text-text-body">
            <li>SafePair reviews your case (1-2 business days)</li>
            <li>If accepted, SafePair contacts you to schedule</li>
            <li>If declined, you receive a full refund</li>
          </ol>
        </div>

        <div className="mt-8">
          <Link
            href="/"
            className="text-accent-600 hover:text-accent-500 font-semibold text-sm"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
