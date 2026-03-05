"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { intakeSchema, type IntakeData, COUNTY_OPTIONS, SERVICE_OPTIONS } from "@/lib/validations/intake";
import { captureUtm, getStoredUtm } from "@/lib/analytics/utm";
import { track } from "@/lib/analytics/events";

const STEPS = ["County & Service", "Family Details", "Contact Info", "Documents", "Review & Pay"];

const CHECKLIST = [
  "A valid government-issued photo ID for each adult",
  "Your court order or stipulation (if you have one)",
  "The other parent\u2019s full name and contact information",
  "Your preferred schedule and any date restrictions",
  "Any restraining orders or no-contact orders that apply",
  "Names and ages of all children involved",
];

const DOCUMENT_LABELS = [
  "Driver's License / Photo ID",
  "Court Order",
  "Custody Agreement",
  "Restraining Order",
  "No-Contact Order",
  "Stipulation",
  "Parenting Plan",
  "Attorney Letter",
  "Income Documentation",
  "Other",
] as const;

type UploadedDoc = {
  id: string;
  label: string;
  file_name: string;
  file_url: string;
};

export default function StartPage() {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [leadId, setLeadId] = useState<string | null>(null);
  const [documents, setDocuments] = useState<UploadedDoc[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [selectedLabel, setSelectedLabel] = useState<string>(DOCUMENT_LABELS[0]);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  async function ensureLeadCreated(): Promise<string> {
    if (leadId) return leadId;

    const utm = getStoredUtm();
    const payload = { ...values, ...utm };

    const leadRes = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!leadRes.ok) throw new Error("Failed to create lead");
    const result = await leadRes.json();
    setLeadId(result.leadId);
    return result.leadId;
  }

  async function nextStep() {
    const fieldsPerStep: (keyof IntakeData)[][] = [
      ["county_slug", "service_slug"],
      ["petitioner_first", "petitioner_last", "adults_count", "has_court_order"],
      ["email", "phone"],
      [], // Documents step — no form validation needed
      [],
    ];
    const valid = await trigger(fieldsPerStep[step]);
    if (!valid) return;

    // Before entering Documents step, create the lead so we have an ID for uploads
    if (step === 2) {
      try {
        await ensureLeadCreated();
      } catch {
        setError("Failed to save your information. Please try again.");
        return;
      }
    }

    setStep((s) => s + 1);
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError(null);

    try {
      const currentLeadId = await ensureLeadCreated();

      const formData = new FormData();
      formData.append("file", file);
      formData.append("leadId", currentLeadId);
      formData.append("label", selectedLabel);

      const res = await fetch("/api/documents", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Upload failed");
      }

      const { document } = await res.json();
      setDocuments((prev) => [...prev, document]);
      track("document_uploaded", { label: selectedLabel });
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      // Reset file input
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  function removeDocument(docId: string) {
    setDocuments((prev) => prev.filter((d) => d.id !== docId));
  }

  async function onSubmit() {
    setSubmitting(true);
    setError(null);

    try {
      const currentLeadId = await ensureLeadCreated();

      track("submit_intake", { county: values.county_slug, service: values.service_slug, documents: documents.length });

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

        <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="mt-8">
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

          {/* Step 4: Documents */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="rounded-xl border border-border-default bg-surface-card p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-text-heading mb-2">Upload Documents</h3>
                <p className="text-sm text-text-muted mb-6">
                  Upload any relevant documents — driver&apos;s license, court orders, restraining orders, custody agreements, etc.
                  Select a label for each document so SafePair knows what it is. You can take a photo on your phone or upload a file.
                </p>

                {/* Label selector */}
                <div className="mb-4">
                  <label htmlFor="doc-label" className="block text-sm font-semibold text-text-heading mb-2">
                    Document Type
                  </label>
                  <select
                    id="doc-label"
                    value={selectedLabel}
                    onChange={(e) => setSelectedLabel(e.target.value)}
                    className="w-full rounded-lg border border-border-input bg-surface-input px-4 py-3 text-text-heading focus:outline-none focus:ring-2 focus:ring-accent-600"
                  >
                    {DOCUMENT_LABELS.map((label) => (
                      <option key={label} value={label}>{label}</option>
                    ))}
                  </select>
                </div>

                {/* File input — supports camera on mobile */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <label className={`flex-1 flex items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border-input px-4 py-4 text-sm font-semibold cursor-pointer transition-colors ${uploading ? "opacity-50 pointer-events-none" : "hover:border-accent-600 hover:bg-surface-accent/30"}`}>
                    <svg className="w-5 h-5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    <span className="text-text-heading">
                      {uploading ? "Uploading..." : "Choose File or Take Photo"}
                    </span>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*,.pdf,.doc,.docx"
                      capture="environment"
                      onChange={handleFileUpload}
                      disabled={uploading}
                      className="sr-only"
                    />
                  </label>
                </div>

                <p className="mt-2 text-xs text-text-muted">
                  PDF, JPG, PNG, HEIC, or Word. Max 10MB per file.
                </p>

                {uploadError && (
                  <p className="mt-3 text-sm text-error">{uploadError}</p>
                )}
              </div>

              {/* Uploaded documents list */}
              {documents.length > 0 && (
                <div className="rounded-xl border border-border-default bg-surface-card p-6 shadow-sm">
                  <h3 className="text-base font-semibold text-text-heading mb-4">
                    Uploaded Documents ({documents.length})
                  </h3>
                  <ul className="space-y-3">
                    {documents.map((doc) => (
                      <li key={doc.id} className="flex items-center justify-between gap-3 rounded-lg bg-surface-muted px-4 py-3">
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-text-heading truncate">{doc.label}</p>
                          <p className="text-xs text-text-muted truncate">{doc.file_name}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeDocument(doc.id)}
                          className="shrink-0 text-xs font-semibold text-error hover:underline"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <p className="text-sm text-text-muted">
                Documents are optional but help SafePair review your case faster. You can skip this step and provide documents later.
              </p>
            </div>
          )}

          {/* Step 5: Review & Pay */}
          {step === 4 && (
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
                  <div className="flex justify-between">
                    <dt>Documents</dt>
                    <dd className="font-semibold text-text-heading">{documents.length} uploaded</dd>
                  </div>
                </dl>

                {documents.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-border-default">
                    <p className="text-xs font-semibold text-text-heading mb-2">Documents:</p>
                    <ul className="space-y-1">
                      {documents.map((doc) => (
                        <li key={doc.id} className="text-xs text-text-muted">
                          {doc.label} — {doc.file_name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
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
                {step === 3 ? (documents.length > 0 ? "Continue" : "Skip & Continue") : "Continue"}
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
