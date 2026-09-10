import type { TextProperty } from "@akasha/pages/text-property"

export type CollectibleLink = string

export const collectibleLink = {
  id: "01a0675a-f185-7b9d-9714-42e1366488ae",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "collectible-link",
  propertySlug: "collectible-link",
  definition: "the string the game writes a collectible's whole state as",
  maxLength: 200,
  nameFormat: null,
} as const satisfies TextProperty
