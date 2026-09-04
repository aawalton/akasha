import type { TemperWeaponEnchant } from "../../temper-weapon-enchant.page-type.ts"

export const absorbStamina = {
  id: "019e5c0d-dcf0-7d4e-9a33-4ea92911078b",
  pageTypeSlug: "temper-weapon-enchant",
  slug: "absorb-stamina",
  title: "Absorb Stamina",
  key: "absorb-stamina",
  effect: "Deals damage and returns stamina (proc-based)",
  glyphName: "Glyph of Absorb Stamina",
  essenceRune: "Deni",
  esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_ABSORB_STAMINA",
  displayOrder: 4,
} as const satisfies TemperWeaponEnchant
