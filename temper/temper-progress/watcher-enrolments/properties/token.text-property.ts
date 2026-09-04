import type { TextProperty } from "@akasha/pages-system/text-property"

export type Token = string

export const token = {
  id: "01a05fd3-4363-77ab-a93e-a7d269483e69",
  pageTypeSlug: "text-property",
  slug: "token",
  propertySlug: "token",
  definition: "the secret a watcher signs its calls with",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
