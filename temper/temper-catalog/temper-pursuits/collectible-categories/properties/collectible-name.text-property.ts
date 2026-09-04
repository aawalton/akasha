import type { TextProperty } from "@akasha/pages-system/text-property"

export type CollectibleName = string

export const collectibleName = {
  id: "01a06165-ae0e-7001-a94f-12db8229907f",
  pageTypeSlug: "text-property",
  slug: "collectible-name",
  propertySlug: "collectible-name",
  definition: "the name the game shows a collectible under",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
