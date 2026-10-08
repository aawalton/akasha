import type { PagePropertyEntry } from "akasha/page/property-entry/page-property-entry.page-type.types.ts"

export const partSpans = {
  id: "01a0d8d7-c56c-7ad7-9089-639bb963f439",
  type: "page-type/page-property-entry",
  slug: "part-spans",
  propertySlug: "part-spans",
  definition: "the lowest and highest key each numbered file of a mine's entry holds",
  writtenBy: "module/mine-row-landing",
  properties: [
    { pageProperty: "text-property/property-slug", required: true, many: false },
    { pageProperty: "number-property/span-part", required: true, many: false },
    { pageProperty: "number-property/first-key", required: true, many: false },
    { pageProperty: "number-property/last-key", required: true, many: false },
  ],
  types: "ts",
  createdAt: "2026-09-25T13:53:34.572Z",
  updatedAt: "2026-09-25T16:56:32.000Z",
} as const satisfies PagePropertyEntry
