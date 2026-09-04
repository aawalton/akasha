import type { PagePropertyEntry } from "@akasha/pages-system/page-property-entry"

export type QualityValues = "jsonl"

export const qualityValues = {
  id: "01a05fb0-3cee-76c4-aa3f-972874e23447",
  pageTypeSlug: "page-property-entry",
  slug: "quality-values",
  propertySlug: "quality-values",
  definition: "what a thing is worth at each grade, one grade to a line",
  properties: [
    { pagePropertySlug: "quality", required: true, many: false },
    { pagePropertySlug: "quality-value", required: true, many: false },
    { pagePropertySlug: "metric-id", required: false, many: false },
  ],
} as const satisfies PagePropertyEntry
