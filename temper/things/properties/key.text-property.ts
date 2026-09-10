import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type Key = string

export const key = {
  id: "01a05fac-7582-7040-9ede-eeb380f191f1",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "key",
  propertySlug: "key",
  definition: "the string The Elder Scrolls Online names a thing by",
  maxLength: 200,
  nameFormat: null,
} as const satisfies TextProperty
