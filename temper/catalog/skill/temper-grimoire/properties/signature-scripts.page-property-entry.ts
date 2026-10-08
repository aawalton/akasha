import type { PagePropertyEntry } from "akasha/page/property-entry/page-property-entry.page-type.types.ts"

export const signatureScripts = {
  id: "01a05fca-cb86-72c5-aca4-0aea9d43b601",
  type: "page-type/page-property-entry",
  slug: "signature-scripts",
  propertySlug: "signature-scripts",
  definition: "the signature scripts a grimoire takes, one to a line",
  properties: [
    { pageProperty: "relation-property/script-id", required: true, many: false },
    { pageProperty: "relation-property/class-id", required: false, many: false },
    { pageProperty: "text-property/description", required: true, many: false },
  ],
  types: "ts",
  createdAt: "2026-09-02T01:45:21.030Z",
  updatedAt: "2026-09-22T15:42:01.000Z",
} as const satisfies PagePropertyEntry
