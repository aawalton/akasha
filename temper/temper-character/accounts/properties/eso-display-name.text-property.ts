import type { TextProperty } from "@akasha/pages-system/text-property"

export type EsoDisplayName = string

export const esoDisplayName = {
  id: "01a0675a-f185-73ed-b7fd-fbb6640a739a",
  pageTypeSlug: "text-property",
  slug: "eso-display-name",
  propertySlug: "display-name",
  definition: "the name The Elder Scrolls Online shows a thing under",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
