"use client";

import { useState } from "react";
import Accordion from "@/components/general/data-display/Accordion";
import type { AccordionItem, AccordionVariant } from "@/components/general/data-display/Accordion";
import PageTitle from "@/components/general/layout/PageTitle";

// ─── Sample data ──────────────────────────────────────────────────────────────

const FAQ_ITEMS: AccordionItem[] = [
  {
    id: "faq-1",
    title: "What is the refund policy?",
    content:
      "You may request a full refund within 30 days of purchase. After 30 days, refunds are issued as store credit. To start a refund, contact support with your order number.",
  },
  {
    id: "faq-2",
    title: "How do I reset my password?",
    content:
      "Go to the login page and click \"Forgot password\". Enter your email address and we'll send you a reset link valid for 24 hours.",
  },
  {
    id: "faq-3",
    title: "Can I transfer my licence to another device?",
    content:
      "Yes. Deactivate the licence on your current device from Account → Licences, then activate it on the new device. Each licence supports up to two active devices.",
  },
  {
    id: "faq-4",
    title: "Is there a free trial available?",
    content:
      "We offer a 14-day free trial with full access to all features. No credit card is required to start.",
  },
];

const SETTINGS_ITEMS: AccordionItem[] = [
  {
    id: "settings-notifications",
    title: "Notifications",
    content: (
      <div className="space-y-3">
        <p className="text-sm text-gray-600">
          Control when and how you receive notifications.
        </p>
        <div className="space-y-2">
          {["Email digests", "Push notifications", "SMS alerts"].map((label) => (
            <label key={label} className="flex items-center gap-3 text-sm">
              <input type="checkbox" className="rounded border-gray-300" defaultChecked />
              {label}
            </label>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "settings-privacy",
    title: "Privacy",
    content: (
      <div className="space-y-3">
        <p className="text-sm text-gray-600">
          Manage who can see your profile and activity.
        </p>
        <div className="space-y-2">
          {["Public profile", "Show activity status", "Allow data analytics"].map((label) => (
            <label key={label} className="flex items-center gap-3 text-sm">
              <input type="checkbox" className="rounded border-gray-300" />
              {label}
            </label>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "settings-billing",
    title: "Billing",
    content: (
      <div className="space-y-2 text-sm text-gray-700">
        <p>Current plan: <strong>Pro — $12/mo</strong></p>
        <p>Next billing date: <strong>May 20, 2026</strong></p>
        <button className="mt-2 rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium hover:bg-gray-50 transition-colors">
          Manage billing →
        </button>
      </div>
    ),
  },
];

const CHANGELOG_ITEMS: AccordionItem[] = [
  {
    id: "v3-2",
    title: "v3.2 — April 2026",
    content: (
      <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
        <li>Added <code className="rounded bg-gray-100 px-1 text-xs">allowMultiple</code> and <code className="rounded bg-gray-100 px-1 text-xs">defaultOpenIndex</code> props to Accordion</li>
        <li>Calendar component now exports time utilities</li>
        <li>SpeakerCard link wrapper extracted to <code className="rounded bg-gray-100 px-1 text-xs">SpeakerLink</code></li>
        <li>Hydration fix on CalendarHeatmap demo page</li>
      </ul>
    ),
  },
  {
    id: "v3-1",
    title: "v3.1 — March 2026",
    content: (
      <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
        <li>PageHero now accepts <code className="rounded bg-gray-100 px-1 text-xs">overlap</code> prop</li>
        <li>Container component added</li>
        <li>Calendar legend is now toggleable via <code className="rounded bg-gray-100 px-1 text-xs">showLegend</code></li>
      </ul>
    ),
  },
  {
    id: "v3-0",
    title: "v3.0 — January 2026",
    content: (
      <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
        <li>Initial release of the component library</li>
        <li>BaseModal, ConfirmModal, FormModal scaffolded</li>
        <li>CalendarHeatmap integrated</li>
      </ul>
    ),
  },
];

// ─── Variant picker ───────────────────────────────────────────────────────────

const VARIANTS: { value: AccordionVariant; label: string; description: string }[] = [
  { value: "default", label: "Default", description: "Navy header — ideal for FAQs and prominent sections" },
  { value: "light",   label: "Light",   description: "Grey header — good for settings panels and sidebars" },
  { value: "minimal", label: "Minimal", description: "Borderline only — suits inline content and changelogs" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AccordionShowcasePage() {
  const [variant, setVariant] = useState<AccordionVariant>("default");

  const demoData =
    variant === "default"
      ? FAQ_ITEMS
      : variant === "light"
      ? SETTINGS_ITEMS
      : CHANGELOG_ITEMS;

  return (
    <>
      <PageTitle title="ACCORDION" />
      <div className="px-6 py-10">
        <div className="mx-auto max-w-5xl space-y-10">

          {/* Variant cards */}
          <div className="grid gap-6 md:grid-cols-3">
            {VARIANTS.map(({ value, label, description }) => (
              <div
                key={value}
                className="space-y-4 rounded-xl border bg-white p-6 text-center shadow-md"
              >
                <h2 className="text-byu-navy text-lg font-semibold">{label}</h2>
                <p className="text-sm text-gray-600">{description}</p>
                <button
                  onClick={() => setVariant(value)}
                  className={`w-full rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    variant === value
                      ? "bg-byu-navy text-white"
                      : "border border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                  }`}
                >
                  {variant === value ? "Currently showing" : `Show ${label}`}
                </button>
              </div>
            ))}
          </div>

          {/* Live demo */}
          <div className="rounded-xl border bg-white p-6 shadow-md">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-byu-navy text-lg font-semibold capitalize">{variant} variant</h2>
                <p className="text-sm text-gray-500 mt-0.5">
                  {variant === "default" && "Single-open mode — opening one closes the rest"}
                  {variant === "light"   && "Multi-open mode — all panels can be open at once"}
                  {variant === "minimal" && "Single-open mode with first item pre-expanded"}
                </p>
              </div>
            </div>

            {variant === "default" && (
              <Accordion items={demoData} variant="default" />
            )}
            {variant === "light" && (
              <Accordion items={demoData} variant="light" allowMultiple />
            )}
            {variant === "minimal" && (
              <Accordion items={demoData} variant="minimal" defaultOpenIndex={0} />
            )}
          </div>

          {/* Props reference */}
          <div className="rounded-xl border bg-white p-6 shadow-md">
            <h2 className="text-byu-navy mb-4 text-lg font-semibold">Props</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-xs uppercase tracking-wide text-gray-500">
                    <th className="pb-2 pr-4 font-semibold">Prop</th>
                    <th className="pb-2 pr-4 font-semibold">Type</th>
                    <th className="pb-2 pr-4 font-semibold">Default</th>
                    <th className="pb-2 font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700">
                  {[
                    ["items", "AccordionItem[]", "—", "Array of { id?, title, content } objects. content accepts ReactNode."],
                    ["variant", '"default" | "light" | "minimal"', '"default"', "Controls the header visual style."],
                    ["allowMultiple", "boolean", "false", "When true, multiple items can be open at the same time."],
                    ["defaultOpenIndex", "number", "undefined", "Index of the item that is open on first render."],
                  ].map(([prop, type, def, desc]) => (
                    <tr key={prop}>
                      <td className="py-2.5 pr-4 font-mono text-xs text-byu-navy">{prop}</td>
                      <td className="py-2.5 pr-4 font-mono text-xs text-gray-500">{type}</td>
                      <td className="py-2.5 pr-4 font-mono text-xs text-gray-400">{def}</td>
                      <td className="py-2.5 text-gray-600">{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Usage snippet */}
          <div className="rounded-xl border bg-white p-6 shadow-md">
            <h2 className="text-byu-navy mb-1 text-lg font-semibold">Usage</h2>
            <p className="mb-4 text-sm text-gray-600">
              Content can be a plain string or any JSX — links, lists, form controls, etc.
            </p>
            <pre className="overflow-x-auto rounded-lg bg-gray-50 p-4 text-xs leading-relaxed text-gray-800">
{`import Accordion from "@/components/general/display/Accordion";

const items = [
  { id: "a", title: "Plain text answer", content: "Just a string." },
  {
    id: "b",
    title: "Rich content answer",
    content: (
      <ul className="list-disc pl-5 space-y-1 text-sm">
        <li>Supports any JSX</li>
        <li>Links, lists, form controls…</li>
      </ul>
    ),
  },
];

// FAQ — one open at a time, first item pre-expanded
<Accordion items={items} defaultOpenIndex={0} />

// Settings panel — all open at once, light style
<Accordion items={items} variant="light" allowMultiple />

// Changelog — minimal border style
<Accordion items={items} variant="minimal" />`}
            </pre>
          </div>

        </div>
      </div>
    </>
  );
}