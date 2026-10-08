import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const scriptType = {
  id: "01a05fca-cb86-7ada-8ab9-4822a45c4ebf",
  type: "page-type/text-property",
  slug: "script-type",
  propertySlug: "script-type",
  definition: "which of the three scripts a scribing source yields",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  types: "ts",
  createdAt: "2026-09-02T01:45:21.030Z",
  updatedAt: "2026-09-21T15:29:38.000Z",
} as const satisfies TextProperty
