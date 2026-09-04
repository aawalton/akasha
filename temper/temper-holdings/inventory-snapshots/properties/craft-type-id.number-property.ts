import type { NumberProperty } from "@akasha/pages-system/number-property"

export type CraftTypeId = number

export const craftTypeId = {
  id: "01a0675a-f185-7d51-8d97-cdad0a8ac27f",
  pageTypeSlug: "number-property",
  slug: "craft-type-id",
  propertySlug: "craft-type-id",
  definition: "the craft a level is in, as the game numbers crafts",
  max: null,
} as const satisfies NumberProperty
