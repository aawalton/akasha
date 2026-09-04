import type { NumberProperty } from "@akasha/pages-system/number-property"

export type EnchantmentMultiplier = number

export const enchantmentMultiplier = {
  id: "01a05fd1-d43a-7f89-a21f-954013b3adfe",
  pageTypeSlug: "number-property",
  slug: "enchantment-multiplier",
  propertySlug: "enchantment-multiplier",
  definition: "how much of a glyph's effect a weapon of this kind carries",
  max: null,
} as const satisfies NumberProperty
