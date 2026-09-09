import type { TemperWeaponEnchant } from "../../temper-weapon-enchant.page-type.ts"

export const foulness = {
  id: "019e5c0d-dcfd-78d4-9209-d0659cdd162f",
  pageTypeSlug: "temper-weapon-enchant",
  slug: "foulness",
  title: "Foulness",
  key: "foulness",
  effect: "Deals disease damage on proc",
  glyphName: "Glyph of Foulness",
  essenceRune: "Haoko",
  esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_BEFOULED_WEAPON",
  displayOrder: 13,
} as const satisfies TemperWeaponEnchant
