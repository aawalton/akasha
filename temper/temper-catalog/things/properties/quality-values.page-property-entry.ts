import type { PagePropertyEntry } from "akasha/pages/property-entries/page-property-entry.page-type.types.ts"

export type QualityValues = "jsonl"

export const qualityValues = {
  id: "01a05fb0-3cee-76c4-aa3f-972874e23447",
  pageTypeSlug: "page-property-entry",
  type: "page-property-entry",
  slug: "quality-values",
  propertySlug: "quality-values",
  definition: "what a thing is worth at each grade, one grade to a line",
  properties: [
    { pageProperty: "text-property/quality", required: true, many: false },
    { pageProperty: "number-property/quality-value", required: true, many: false },
    { pageProperty: "text-property/metric-id", required: false, many: false },
  ],
} as const satisfies PagePropertyEntry
