import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const token = {
  id: "01a05fd3-4363-77ab-a93e-a7d269483e69",
  type: "page-type/text-property",
  slug: "token",
  propertySlug: "token",
  definition: "the secret signing a watcher's calls",
  maxLength: 200,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
