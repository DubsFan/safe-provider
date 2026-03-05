"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type FaqItem = { question: string; answer: string };

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div
          key={index}
          className="rounded-xl border border-border-default bg-surface-card shadow-sm"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="flex w-full items-center justify-between p-6 text-left"
            aria-expanded={openIndex === index}
          >
            <span className="text-base font-semibold text-text-heading pr-4">
              {item.question}
            </span>
            <ChevronDown
              className={`h-5 w-5 shrink-0 text-text-muted transition-transform ${
                openIndex === index ? "rotate-180" : ""
              }`}
            />
          </button>
          {openIndex === index && (
            <div
              className="px-6 pb-6 text-text-body [&_a]:text-accent-600 [&_a]:underline [&_a]:hover:text-accent-500"
              dangerouslySetInnerHTML={{ __html: item.answer }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
