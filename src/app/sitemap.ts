import type { MetadataRoute } from "next";
import { SITE_URL, COUNTIES, SERVICES } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const liveCounties = COUNTIES.filter((c) => c.status === "live");

  const staticRoutes = [
    "",
    "/how-it-works",
    "/pricing",
    "/counties",
    "/services/supervised-visitation",
    "/services/supervised-exchange",
    "/for-attorneys",
    "/faq",
    "/contact",
    "/start",
  ];

  const countyRoutes = liveCounties.map((c) => `/counties/${c.slug}`);

  const countyServiceRoutes = liveCounties.flatMap((c) =>
    SERVICES.map((s) => `/counties/${c.slug}/${s.slug}`)
  );

  const allRoutes = [...staticRoutes, ...countyRoutes, ...countyServiceRoutes];

  return allRoutes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date("2026-03-05"),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.startsWith("/counties/") ? 0.8 : 0.6,
  }));
}
