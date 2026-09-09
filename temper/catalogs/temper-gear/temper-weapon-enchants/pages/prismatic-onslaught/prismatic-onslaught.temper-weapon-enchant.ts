import type { TemperWeaponEnchant } from "../../temper-weapon-enchant.page-type.ts"

export const prismaticOnslaught = {
  id: "019e5c0d-dcfe-794e-92b0-c1c3a698dafd",
  pageTypeSlug: "temper-weapon-enchant",
  slug: "prismatic-onslaught",
  title: "Prismatic Onslaught",
  key: "prismatic-onslaught",
  effect: "Deals multi-element damage on proc",
  glyphName: "Glyph of Prismatic Onslaught",
  essenceRune: "Hakeijo",
  esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_PRISMATIC_ONSLAUGHT",
  displayOrder: 14,
} as const satisfies TemperWeaponEnchant
