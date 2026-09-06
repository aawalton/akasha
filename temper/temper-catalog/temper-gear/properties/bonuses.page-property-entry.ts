import type { PagePropertyEntry } from "@akasha/pages/page-property-entry"

export type Bonuses = "jsonl"

export const bonuses = {
  id: "01a05fd1-d437-730d-b6e2-e46b2bc06210",
  pageTypeSlug: "page-property-entry",
  slug: "bonuses",
  propertySlug: "bonuses",
  definition: "what a set gives at each piece count, one count to a line",
  properties: [
    { pagePropertySlug: "number-property/bonus-count", required: true, many: false },
    { pagePropertySlug: "text-property/bonus-status", required: true, many: false },
    { pagePropertySlug: "text-property/description", required: true, many: false },
    {
      pagePropertySlug: "record-property/bonus-effects",
      required: false,
      many: true,
      maxCount: null,
    },
  ],
} as const satisfies PagePropertyEntry
