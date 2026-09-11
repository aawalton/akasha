import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const apiVersion = {
  id: "01a05fc4-7a8f-70ba-9a82-91ea7a039a9b",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "api-version",
  propertySlug: "api-version",
  definition: "the game build a capture was taken from",
  maxLength: 100,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
