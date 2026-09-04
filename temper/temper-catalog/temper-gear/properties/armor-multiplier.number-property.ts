import type { NumberProperty } from "@akasha/pages-system/number-property"

export type ArmorMultiplier = number

export const armorMultiplier = {
  id: "01a05fd1-d436-747d-9b85-c19e00005b75",
  pageTypeSlug: "number-property",
  slug: "armor-multiplier",
  propertySlug: "armor-multiplier",
  definition: "the share of a weight's armor one piece of this kind carries",
  max: null,
} as const satisfies NumberProperty
