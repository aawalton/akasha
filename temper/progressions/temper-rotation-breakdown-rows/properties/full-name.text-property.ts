import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const fullName = {
  id: "01a05fc9-9a02-75b0-b2c1-f758a29efa80",
  type: "text-property",
  slug: "full-name",
  propertySlug: "full-name",
  definition: "the name a row is shown under where there is room for it",
  maxLength: 100,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
