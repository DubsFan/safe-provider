"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { intakeSchema, type IntakeData, COUNTY_OPTIONS, SERVICE_OPTIONS } from "@/lib/validations/intake";
import { captureUtm, getStoredUtm } from "@/lib/analytics/utm";
import { track } from "@/lib/analytics/events";

const STEPS = ["County & Service", "Family Details", "Contact Info", "Review & Pay"];

const CHECKLIST = [
  "A valid government-issued photo ID for each adult",
  "Your court order or stipulation (if you have one)",
  "The other parent\u2019s full name and contact information",
  "Your preferred schedule and any date restrictions",
  "Any restraining orders or no-contact orders that apply",
  "Names and ages of all children involved",
];

export default function StartPage() {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [leadId, setLeadId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm<IntakeData>({
    resolver: standardSchemaResolver(intakeSchema),
    defaultValues: {
      adults_count: 2,
      has_court_order: false,
    },
  });

  useEffect(() => {
    captureUtm();
    track("start_intake");
  }, []);

  const values = watch();

  async function nextStep() {
    const fieldsPerStep: (keyof IntakeData)[][] = [
      ["county_slug", "service_slug"],
      ["petitioner_first", "petitioner_last", "adults_count", "has_court_order"],
      ["email", "phone"],
      [],
    ];
    const valid = await trigger(fieldsPerStep[step]);
    if (valid) setStep((s) => s + 1);
  }

  async function onSubmit(data: IntakeData) {
    setSubmitting(true);
    setError(null);

    // Attach UTM
    const utm = getStoredUtm();
    const payload = { ...data, ...utm };

    try {
      track("submit_intake", { county: data.county_slug, service: data.service_slug });

      // Create lead (skip if already created on retry)
      let currentLeadId = leadId;
      if (!currentLeadId) {
        const leadRes = await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!leadRes.ok) throw new Error("Failed to create lead");
        const result = await leadRes.json();
        currentLeadId = result.leadId;
        setLeadId(currentLeadId);
      }

      // Create checkout
      const checkoutRes = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId: currentLeadId }),
      });
      if (!checkoutRes.ok) throw new Error("Failed to create checkout session");
      const { url } = await checkoutRes.json();

      track("checkout_created", { leadId: currentLeadId });

      // Redirect to Stripe
      window.location.href = url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSubmitting(false);
    }
  }

  const selectedCounty = COUNTY_OPTIONS.find((c) => c.value === values.county_slug);
  const selectedService = SERVICE_OPTIONS.find((s) => s.value === values.service_slug);

  return (
    <div className="relative py-16">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.06]"
        style={{ backgroundImage: "url(/images/intake-flatlay.webp)" }}
      />
      <div className="relative mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-text-heading text-center">Start Your Intake</h1>
        <p className="mt-4 text-lg text-text-body text-center">
          Select your county and service to begin.
        </p>

        {/* What to have ready */}
        <div className="mt-6 rounded-xl border border-border-default bg-surface-card p-5 shadow-sm">
          <h2 className="text-base font-semibold text-text-heading mb-3">What to Have Ready</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {CHECKLIST.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-text-body">
                <span className="shrink-0 w-5 h-5 rounded-full bg-surface-muted text-text-heading flex items-center justify-center text-xs font-semibold">{i + 1}</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Step indicator */}
        <div className="mt-8 flex justify-center gap-2">
          {STEPS.map((label, i) => (
            <div
              key={label}
              className={`flex items-center gap-1 text-sm ${
                i <= step ? "text-accent-600 font-semibold" : "text-text-muted"
              }`}
            >
              <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${
                i <= step ? "bg-accent-600 text-white" : "bg-surface-muted text-text-muted"
              }`}>
                {i + 1}
              </span>
              <span className="hidden sm:inline">{label}</span>
              {i < STEPS.length - 1 && <span className="mx-1 text-text-muted">—</span>}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
          {/* Step 1: County & Service */}
          {step === 0 && (
            <div className="space-y-6">
              <div>
                <label htmlFor="county_slug" className="block text-sm font-semibold text-text-heading mb-2">County</label>
                <select
                  id="county_slug"
                  {...register("county_slug")}
                  aria-invalid={!!errors.county_slug}
                  aria-describedby={errors.county_slug ? "county_slug-error" : undefined}
                  className="w-full rounded-lg border border-border-input bg-surface-input px-4 py-3 text-text-heading focus:outline-none focus:ring-2 focus:ring-accent-600"
                >
                  <option value="">Select a county...</option>
                  {COUNTY_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                {errors.county_slug && <p id="county_slug-error" className="mt-1 text-sm text-error">{errors.county_slug.message}</p>}
              </div>
              <div>
                <label htmlFor="service_slug" className="block text-sm font-semibold text-text-heading mb-2">Service</label>
                <select
                  id="service_slug"
                  {...register("service_slug")}
                  aria-invalid={!!errors.service_slug}
                  aria-describedby={errors.service_slug ? "service_slug-error" : undefined}
                  className="w-full rounded-lg border border-border-input bg-surface-input px-4 py-3 text-text-heading focus:outline-none focus:ring-2 focus:ring-accent-600"
                >
                  <option value="">Select a service...</option>
                  {SERVICE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                {errors.service_slug && <p id="service_slug-error" className="mt-1 text-sm text-error">{errors.service_slug.message}</p>}
              </div>
            </div>
          )}

          {/* Step 2: Family Details */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="petitioner_first" className="block text-sm font-semibold text-text-heading mb-2">Your First Name</label>
                  <input
                    id="petitioner_first"
                    {...register("petitioner_first")}
                    aria-invalid={!!errors.petitioner_first}
                    aria-describedby={errors.petitioner_first ? "petitioner_first-error" : undefined}
                    className="w-full rounded-lg border border-border-input bg-surface-input px-4 py-3 text-text-heading focus:outline-none focus:ring-2 focus:ring-accent-600"
                  />
                  {errors.petitioner_first && <p id="petitioner_first-error" className="mt-1 text-sm text-error">{errors.petitioner_first.message}</p>}
                </div>
                <div>
                  <label htmlFor="petitioner_last" className="block text-sm font-semibold text-text-heading mb-2">Your Last Name</label>
                  <input
                    id="petitioner_last"
                    {...register("petitioner_last")}
                    aria-invalid={!!errors.petitioner_last}
                    aria-describedby={errors.petitioner_last ? "petitioner_last-error" : undefined}
                    className="w-full rounded-lg border border-border-input bg-surface-input px-4 py-3 text-text-heading focus:outline-none focus:ring-2 focus:ring-accent-600"
                  />
                  {errors.petitioner_last && <p id="petitioner_last-error" className="mt-1 text-sm text-error">{errors.petitioner_last.message}</p>}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-text-heading mb-2">Other Parent&apos;s First Name</label>
                  <input
                    {...register("respondent_first")}
                    className="w-full rounded-lg border border-border-input bg-surface-input px-4 py-3 text-text-heading focus:outline-none focus:ring-2 focus:ring-accent-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-text-heading mb-2">Other Parent&apos;s Last Name</label>
                  <input
                    {...register("respondent_last")}
                    className="w-full rounded-lg border border-border-input bg-surface-input px-4 py-3 text-text-heading focus:outline-none focus:ring-2 focus:ring-accent-600"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-text-heading mb-2">Number of Adults for Intake</label>
                <select
                  {...register("adults_count", { valueAsNumber: true })}
                  className="w-full rounded-lg border border-border-input bg-surface-input px-4 py-3 text-text-heading focus:outline-none focus:ring-2 focus:ring-accent-600"
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                </select>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  {...register("has_court_order")}
                  className="h-4 w-4 rounded border-border-input text-accent-600 focus:ring-accent-600"
                />
                <label className="text-sm text-text-heading">I have a court order or stipulation</label>
              </div>
              <div>
                <label className="block text-sm font-semibold text-text-heading mb-2">Court Order Notes (optional)</label>
                <textarea
                  {...register("court_order_notes")}
                  rows={3}
                  className="w-full rounded-lg border border-border-input bg-surface-input px-4 py-3 text-text-heading focus:outline-none focus:ring-2 focus:ring-accent-600"
                />
              </div>
            </div>
          )}

          {/* Step 3: Contact Info */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-text-heading mb-2">Email</label>
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className="w-full rounded-lg border border-border-input bg-surface-input px-4 py-3 text-text-heading focus:outline-none focus:ring-2 focus:ring-accent-600"
                />
                {errors.email && <p id="email-error" className="mt-1 text-sm text-error">{errors.email.message}</p>}
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-text-heading mb-2">Phone</label>
                <input
                  id="phone"
                  type="tel"
                  {...register("phone")}
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                  className="w-full rounded-lg border border-border-input bg-surface-input px-4 py-3 text-text-heading focus:outline-none focus:ring-2 focus:ring-accent-600"
                />
                {errors.phone && <p id="phone-error" className="mt-1 text-sm text-error">{errors.phone.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-text-heading mb-2">Preferred Schedule (optional)</label>
                <textarea
                  {...register("preferred_schedule")}
                  rows={3}
                  placeholder="e.g., Saturdays 10am-12pm"
                  className="w-full rounded-lg border border-border-input bg-surface-input px-4 py-3 text-text-heading focus:outline-none focus:ring-2 focus:ring-accent-600"
                />
              </div>
            </div>
          )}

          {/* Step 4: Review & Pay */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="rounded-xl border border-border-default bg-surface-card p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-text-heading mb-4">Review Your Information</h3>
                <dl className="space-y-2 text-sm text-text-body">
                  <div className="flex justify-between">
                    <dt>County</dt>
                    <dd className="font-semibold text-text-heading">{selectedCounty?.label ?? values.county_slug}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Service</dt>
                    <dd className="font-semibold text-text-heading">{selectedService?.label ?? values.service_slug}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Name</dt>
                    <dd className="font-semibold text-text-heading">{values.petitioner_first} {values.petitioner_last}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Email</dt>
                    <dd className="font-semibold text-text-heading">{values.email}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Phone</dt>
                    <dd className="font-semibold text-text-heading">{values.phone}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Adults</dt>
                    <dd className="font-semibold text-text-heading">{values.adults_count}</dd>
                  </div>
                </dl>
              </div>

              <div className="rounded-lg bg-surface-accent p-4 text-sm text-text-heading">
                Payment does not guarantee provider acceptance. SafePair reviews every case independently.
              </div>
            </div>
          )}

          {error && (
            <div className="mt-4 rounded-lg bg-red-50 dark:bg-red-800/20 p-4 text-sm text-error">
              {error}
            </div>
          )}

          {/* Navigation */}
          <div className="mt-8 flex justify-between">
            {step > 0 ? (
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className="rounded-lg border border-border-default bg-surface-card px-6 py-3 text-base font-semibold text-text-heading hover:bg-surface-muted transition-colors"
              >
                Back
              </button>
            ) : (
              <div />
            )}

            {step < STEPS.length - 1 ? (
              <button
                type="button"
                onClick={nextStep}
                className="rounded-lg bg-accent-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-accent-500 transition-colors"
              >
                Continue
              </button>
            ) : (
              <button
                type="submit"
                disabled={submitting}
                className="rounded-lg bg-accent-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-accent-500 transition-colors disabled:opacity-50"
              >
                {submitting ? "Processing..." : "Proceed to Payment"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

