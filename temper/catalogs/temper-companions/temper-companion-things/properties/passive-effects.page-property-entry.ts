import type { PagePropertyEntry } from "akasha/pages/property-entries/page-property-entry.page-type.types.ts"

export type PassiveEffects = "jsonl"

export const passiveEffects = {
  id: "01a05fcf-2469-73b4-a32a-44ca09660ace",
  pageTypeSlug: "page-property-entry",
  type: "page-property-entry",
  slug: "passive-effects",
  propertySlug: "passive-effects",
  definition: "what a companion's own passive moves, one metric to a line",
  properties: [
    { pageProperty: "text-property/metric-id", required: true, many: false },
    { pageProperty: "number-property/effect-value", required: true, many: false },
  ],
} as const satisfies PagePropertyEntry
