import type { PagePropertyEntry } from "@akasha/pages/page-property-entry"

export type Effects = "jsonl"

export const effects = {
  id: "01a05fb0-3ceb-742c-998f-6122c9954a30",
  pageTypeSlug: "page-property-entry",
  type: "page-property-entry",
  slug: "effects",
  propertySlug: "effects",
  definition: "what a thing does, one effect to a line",
  properties: [
    { pageProperty: "text-property/metric-id", required: false, many: false },
    { pageProperty: "text-property/effect-type", required: false, many: false },
    { pageProperty: "number-property/effect-value", required: false, many: false },
    { pageProperty: "number-property/effect-seconds", required: false, many: false },
    { pageProperty: "text-property/buff-id", required: false, many: false },
    { pageProperty: "text-property/debuff-id", required: false, many: false },
    { pageProperty: "text-property/slotted-behavior", required: false, many: false },
    { pageProperty: "text-property/value-type", required: false, many: false },
    { pageProperty: "text-property/armor-weight", required: false, many: false },
    { pageProperty: "number-property/value-per-piece", required: false, many: false },
    { pageProperty: "number-property/value-per-ability", required: false, many: false },
    { pageProperty: "text-property/skill-line-id", required: false, many: false },
    {
      pageProperty: "text-property/effect-weapon-types",
      required: false,
      many: true,
      maxCount: null,
    },
    { pageProperty: "boolean-property/per-weapon", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "An effect moves a metric or puts a buff on the character or companion with the effect.",
    },
    {
      invariantKind: "departure",
      statement: "An effect stating no metric states a buff or a debuff.",
    },
    {
      invariantKind: "departure",
      statement: "Which further fields an effect states is settled by the effect type.",
    },
  ],
} as const satisfies PagePropertyEntry
