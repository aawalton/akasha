import type { PagePropertyEntry } from "@akasha/pages/page-property-entry"

export type Snapshots = "jsonl"

export const snapshots = {
  id: "01a06006-154e-7fe6-a4a2-35245e20fcfb",
  pageTypeSlug: "page-property-entry",
  slug: "snapshots",
  propertySlug: "snapshots",
  definition: "what an account was worth, one reading to a line",
  properties: [
    { pagePropertySlug: "text-property/account-page", required: true, many: false },
    { pagePropertySlug: "instant-property/captured-at", required: true, many: false },
    { pagePropertySlug: "number-property/total-value", required: true, many: false },
    { pagePropertySlug: "number-property/gold-amount", required: false, many: false },
    { pagePropertySlug: "number-property/currency-gold-value", required: false, many: false },
    { pagePropertySlug: "number-property/item-value", required: false, many: false },
    { pagePropertySlug: "number-property/excluded-guild-bank-value", required: false, many: false },
  ],
} as const satisfies PagePropertyEntry
