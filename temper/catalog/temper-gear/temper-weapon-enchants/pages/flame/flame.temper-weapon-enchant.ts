import type { TemperWeaponEnchant } from "akasha/temper/catalog/temper-gear/temper-weapon-enchants/temper-weapon-enchant.page-type.types.ts"

export const flame = {
  id: "019e5c0d-dcf6-70c2-b137-99c98be7f05f",
  type: "temper-weapon-enchant",
  slug: "flame",
  title: "Flame",
  key: "flame",
  effect: "Deals fire damage on proc",
  glyphName: "Glyph of Flame",
  essenceRune: "Rakeipa",
  esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_FIERY_WEAPON",
  displayOrder: 7,
} as const satisfies TemperWeaponEnchant
