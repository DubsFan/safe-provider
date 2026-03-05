import Stripe from "stripe";
import { env } from "@/lib/env";

let stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (stripe) return stripe;
  stripe = new Stripe(env("STRIPE_SECRET_KEY"), {
    apiVersion: "2026-02-25.clover",
    typescript: true,
  });
  return stripe;
}
