import type { TemperWeaponEnchant } from "../../temper-weapon-enchant.page-type.ts"

export const frost = {
  id: "019e5c0d-dcf7-789c-8855-e681d8ae7b76",
  pageTypeSlug: "temper-weapon-enchant",
  slug: "frost",
  title: "Frost",
  key: "frost",
  effect: "Deals frost damage on proc",
  glyphName: "Glyph of Frost",
  essenceRune: "Dekeipa",
  esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_FROZEN_WEAPON",
  displayOrder: 8,
} as const satisfies TemperWeaponEnchant
