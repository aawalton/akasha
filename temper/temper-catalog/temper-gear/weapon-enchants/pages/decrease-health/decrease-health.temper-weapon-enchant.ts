import type { TemperWeaponEnchant } from "../../temper-weapon-enchant.page-type.ts"

export const decreaseHealth = {
  id: "019e5c0d-dcf4-78ce-bda8-5b4eda7f0a26",
  pageTypeSlug: "temper-weapon-enchant",
  slug: "decrease-health",
  title: "Decrease Health",
  key: "decrease-health",
  effect: "Deals instant damage on proc",
  glyphName: "Glyph of Decrease Health",
  essenceRune: "Okoma",
  esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_DAMAGE_HEALTH",
  displayOrder: 6,
} as const satisfies TemperWeaponEnchant
