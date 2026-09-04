import type { PagePropertyEntry } from "@akasha/pages-system/page-property-entry"

export type Bonuses = "jsonl"

export const bonuses = {
  id: "01a05fd1-d437-730d-b6e2-e46b2bc06210",
  pageTypeSlug: "page-property-entry",
  slug: "bonuses",
  propertySlug: "bonuses",
  definition: "what a set gives at each piece count, one count to a line",
  properties: [
    { pagePropertySlug: "bonus-count", required: true, many: false },
    { pagePropertySlug: "bonus-status", required: true, many: false },
    { pagePropertySlug: "description", required: true, many: false },
    { pagePropertySlug: "bonus-effects", required: false, many: true, max: null },
  ],
} as const satisfies PagePropertyEntry
