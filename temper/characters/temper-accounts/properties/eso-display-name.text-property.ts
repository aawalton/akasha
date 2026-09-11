import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const esoDisplayName = {
  id: "01a0675a-f185-73ed-b7fd-fbb6640a739a",
  type: "text-property",
  slug: "eso-display-name",
  propertySlug: "display-name",
  definition: "the name The Elder Scrolls Online shows a thing under",
  maxLength: 200,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
