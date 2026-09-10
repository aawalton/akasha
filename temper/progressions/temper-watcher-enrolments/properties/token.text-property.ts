import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type Token = string

export const token = {
  id: "01a05fd3-4363-77ab-a93e-a7d269483e69",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "token",
  propertySlug: "token",
  definition: "the secret a watcher signs its calls with",
  maxLength: 200,
  nameFormat: null,
} as const satisfies TextProperty
