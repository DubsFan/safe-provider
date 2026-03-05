"use client";

export function track(event: string, properties?: Record<string, unknown>): void {
  // Fire to internal event log API (non-blocking)
  fetch("/api/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event, properties }),
  }).catch(() => {});

  // PostHog (non-blocking, null guard)
  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (posthogKey && typeof window !== "undefined") {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const posthog = (window as any).posthog;
    if (posthog?.capture) {
      posthog.capture(event, properties);
    }
  }
}
