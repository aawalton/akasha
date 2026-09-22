import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const esoDisplayName = {
  id: "01a0675a-f185-73ed-b7fd-fbb6640a739a",
  type: "page-type/text-property",
  slug: "eso-display-name",
  propertySlug: "display-name",
  definition: "the name The Elder Scrolls Online gives a thing",
  maxLength: 200,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
