import type { TemperWeaponEnchant } from "akasha/temper/catalog/temper-gear/temper-weapon-enchants/temper-weapon-enchant.page-type.types.ts"

export const poison = {
  id: "019e5c0d-dcfa-742b-a5f4-8fc092950d0c",
  type: "temper-weapon-enchant",
  slug: "poison",
  title: "Poison",
  key: "poison",
  effect: "Deals poison damage on proc",
  glyphName: "Glyph of Poison",
  essenceRune: "Kuoko",
  esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_POISONED_WEAPON",
  displayOrder: 10,
} as const satisfies TemperWeaponEnchant
