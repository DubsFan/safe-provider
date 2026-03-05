import type { Metadata } from "next";
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from "@/lib/site-config";

export const defaultMetadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    images: [{ url: `${SITE_URL}/images/father-son-library.webp`, width: 2400, height: 1792 }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [`${SITE_URL}/images/father-son-library.webp`],
  },
};

export function buildMetadata(options: {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
}): Metadata {
  const url = `${SITE_URL}${options.path}`;
  return {
    title: options.title,
    description: options.description,
    alternates: { canonical: url },
    openGraph: {
      title: options.title,
      description: options.description,
      url,
    },
    ...(options.noindex ? { robots: { index: false, follow: false } } : {}),
  };
}
