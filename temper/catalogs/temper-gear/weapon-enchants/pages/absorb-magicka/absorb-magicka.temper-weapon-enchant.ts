import type { TemperWeaponEnchant } from "../../temper-weapon-enchant.page-type.ts"

export const absorbMagicka = {
  id: "019e5c0d-dcee-75cd-adc6-d61e688bd9d5",
  pageTypeSlug: "temper-weapon-enchant",
  slug: "absorb-magicka",
  title: "Absorb Magicka",
  key: "absorb-magicka",
  effect: "Deals damage and returns magicka (proc-based)",
  glyphName: "Glyph of Absorb Magicka",
  essenceRune: "Makkoma",
  esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_ABSORB_MAGICKA",
  displayOrder: 3,
} as const satisfies TemperWeaponEnchant
