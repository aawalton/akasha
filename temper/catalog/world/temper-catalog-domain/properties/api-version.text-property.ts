import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const apiVersion = {
  id: "01a05fc4-7a8f-70ba-9a82-91ea7a039a9b",
  type: "page-type/text-property",
  slug: "api-version",
  propertySlug: "api-version",
  definition: "a capture's game build",
  maxLength: 100,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
