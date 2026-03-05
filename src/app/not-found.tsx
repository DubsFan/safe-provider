import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Page Not Found",
  description: "The page you are looking for does not exist.",
  path: "/404",
  noindex: true,
});

export default function NotFound() {
  return (
    <div className="py-24 text-center">
      <div className="mx-auto max-w-2xl px-4">
        <h1 className="text-4xl font-bold text-brand-900">Page Not Found</h1>
        <p className="mt-4 text-brand-700">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="rounded-lg bg-accent-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-accent-500 transition-colors"
          >
            Go Home
          </Link>
          <Link
            href="/start"
            className="rounded-lg border border-brand-500/20 px-6 py-3 text-base font-semibold text-brand-900 hover:bg-brand-100 transition-colors"
          >
            Start Intake
          </Link>
          <Link
            href="/counties"
            className="rounded-lg border border-brand-500/20 px-6 py-3 text-base font-semibold text-brand-900 hover:bg-brand-100 transition-colors"
          >
            Counties
          </Link>
        </div>
      </div>
    </div>
  );
}
