import type { PagePropertyEntry } from "@akasha/pages/page-property-entry"

export type SignatureScripts = "jsonl"

export const signatureScripts = {
  id: "01a05fca-cb86-72c5-aca4-0aea9d43b601",
  pageTypeSlug: "page-property-entry",
  type: "page-property-entry",
  slug: "signature-scripts",
  propertySlug: "signature-scripts",
  definition: "the signature scripts a grimoire takes, one to a line",
  properties: [
    { pageProperty: "text-property/script-id", required: true, many: false },
    { pageProperty: "text-property/class-id", required: false, many: false },
    { pageProperty: "text-property/description", required: true, many: false },
  ],
} as const satisfies PagePropertyEntry
