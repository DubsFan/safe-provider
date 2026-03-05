import { z } from "zod/v4";
import { COUNTIES, SERVICES } from "@/lib/site-config";

const liveCountySlugs = COUNTIES.filter((c) => c.status === "live").map((c) => c.slug);
const serviceSlugs = SERVICES.map((s) => s.slug);

export const intakeSchema = z.object({
  county_slug: z.enum(liveCountySlugs as [string, ...string[]]),
  service_slug: z.enum(serviceSlugs as [string, ...string[]]),
  petitioner_first: z.string().trim().min(1, "First name is required").max(200),
  petitioner_last: z.string().trim().min(1, "Last name is required").max(200),
  respondent_first: z.string().trim().max(200).nullable().optional(),
  respondent_last: z.string().trim().max(200).nullable().optional(),
  email: z.email("Valid email is required").max(320),
  phone: z.string().trim().min(7, "Valid phone number is required").max(30),
  adults_count: z.number().int().min(1).max(4).default(2),
  has_court_order: z.boolean().default(false),
  court_order_notes: z.string().max(2000).nullable().optional(),
  preferred_schedule: z.string().max(1000).nullable().optional(),
  utm_source: z.string().nullable().optional(),
  utm_medium: z.string().nullable().optional(),
  utm_campaign: z.string().nullable().optional(),
  utm_content: z.string().nullable().optional(),
  utm_term: z.string().nullable().optional(),
});

export type IntakeData = z.infer<typeof intakeSchema>;

export const COUNTY_OPTIONS = COUNTIES.filter((c) => c.status === "live").map((c) => ({
  value: c.slug,
  label: c.name,
}));

export const SERVICE_OPTIONS = SERVICES.map((s) => ({
  value: s.slug,
  label: s.name,
}));
