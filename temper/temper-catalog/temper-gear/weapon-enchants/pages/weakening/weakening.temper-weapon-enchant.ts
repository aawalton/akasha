import type { TemperWeaponEnchant } from "../../temper-weapon-enchant.page-type.ts"

export const weakening = {
  id: "019e5c0d-dcfb-74c1-8cd6-816b879f6357",
  pageTypeSlug: "temper-weapon-enchant",
  slug: "weakening",
  title: "Weakening",
  key: "weakening",
  effect: "Reduces target weapon and spell damage on proc",
  glyphName: "Glyph of Weakening",
  essenceRune: "Okori",
  esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_REDUCE_POWER",
  displayOrder: 11,
} as const satisfies TemperWeaponEnchant
