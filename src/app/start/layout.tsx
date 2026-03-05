import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Start Supervised Visitation Intake Online — 5 Minutes",
  description: "Start supervised visitation or custody exchange intake online. 5-minute form. Select your county, provide details, pay securely. Response within 8 hours.",
  path: "/start",
});

export default function StartLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
