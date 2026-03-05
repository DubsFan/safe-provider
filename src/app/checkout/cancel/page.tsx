import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import { XCircle } from "lucide-react";

export const metadata = buildMetadata({
  title: "Payment Cancelled",
  description: "No charge has been made.",
  path: "/checkout/cancel",
  noindex: true,
});

export default function CheckoutCancelPage() {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
        <XCircle className="mx-auto h-16 w-16 text-brand-500" />
        <h1 className="mt-6 text-4xl font-bold text-brand-900">Payment Cancelled</h1>
        <p className="mt-4 text-lg text-brand-700">
          No charge has been made. You can restart your intake at any time.
        </p>

        <div className="mt-8">
          <Link
            href="/start"
            className="rounded-lg bg-accent-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-accent-500 transition-colors"
          >
            Restart Intake
          </Link>
        </div>
      </div>
    </div>
  );
}
