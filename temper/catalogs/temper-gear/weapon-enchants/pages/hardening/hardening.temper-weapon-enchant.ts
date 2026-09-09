import type { TemperWeaponEnchant } from "../../temper-weapon-enchant.page-type.ts"

export const hardening = {
  id: "019e5c0d-dcfc-7566-a423-42926a1dd643",
  pageTypeSlug: "temper-weapon-enchant",
  slug: "hardening",
  title: "Hardening",
  key: "hardening",
  effect: "Grants a damage shield on proc",
  glyphName: "Glyph of Hardening",
  essenceRune: "Derado",
  esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_DAMAGE_SHIELD",
  displayOrder: 12,
} as const satisfies TemperWeaponEnchant
