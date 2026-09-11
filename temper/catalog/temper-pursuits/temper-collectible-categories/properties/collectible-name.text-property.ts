import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const collectibleName = {
  id: "01a06165-ae0e-7001-a94f-12db8229907f",
  type: "text-property",
  slug: "collectible-name",
  propertySlug: "collectible-name",
  definition: "the name the game shows a collectible under",
  maxLength: 200,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
