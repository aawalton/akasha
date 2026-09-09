import type { PagePropertyEntry } from "@akasha/pages/page-property-entry"

export type Snapshots = "jsonl"

export const snapshots = {
  id: "01a06006-154e-7fe6-a4a2-35245e20fcfb",
  pageTypeSlug: "page-property-entry",
  slug: "snapshots",
  propertySlug: "snapshots",
  definition: "what an account was worth, one reading to a line",
  properties: [
    { pageProperty: "text-property/account-page", required: true, many: false },
    { pageProperty: "instant-property/captured-at", required: true, many: false },
    { pageProperty: "number-property/total-value", required: true, many: false },
    { pageProperty: "number-property/gold-amount", required: false, many: false },
    { pageProperty: "number-property/currency-gold-value", required: false, many: false },
    { pageProperty: "number-property/item-value", required: false, many: false },
    { pageProperty: "number-property/excluded-guild-bank-value", required: false, many: false },
  ],
} as const satisfies PagePropertyEntry
