import type { PagePropertyEntry } from "@akasha/pages-system/page-property-entry"

export type SignatureScripts = "jsonl"

export const signatureScripts = {
  id: "01a05fca-cb86-72c5-aca4-0aea9d43b601",
  pageTypeSlug: "page-property-entry",
  slug: "signature-scripts",
  propertySlug: "signature-scripts",
  definition: "the signature scripts a grimoire takes, one to a line",
  properties: [
    { pagePropertySlug: "script-id", required: true, many: false },
    { pagePropertySlug: "class-id", required: false, many: false },
    { pagePropertySlug: "description", required: true, many: false },
  ],
} as const satisfies PagePropertyEntry
