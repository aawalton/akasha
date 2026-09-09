import type { PagePropertyEntry } from "@akasha/pages/page-property-entry"

export type Currencies = "jsonl"

export const currencies = {
  id: "01a0675a-f185-764c-991b-b24e3698ed52",
  pageTypeSlug: "page-property-entry",
  slug: "currencies",
  propertySlug: "currencies",
  definition: "how much of each currency is held, one purse to a line",
  properties: [
    { pageProperty: "text-property/currency-scope", required: true, many: false },
    { pageProperty: "text-property/eso-character-id", required: false, many: false },
    { pageProperty: "relation-property/currency-key", required: true, many: false },
    { pageProperty: "number-property/currency-amount", required: true, many: false },
    { pageProperty: "instant-property/last-scanned-at", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "One line is one currency held under one scope.",
    },
    {
      invariantKind: "departure",
      statement: "A currency held across the whole account names no character.",
    },
    {
      invariantKind: "departure",
      statement: "A currency held by one character names when that character was last read.",
    },
  ],
} as const satisfies PagePropertyEntry
