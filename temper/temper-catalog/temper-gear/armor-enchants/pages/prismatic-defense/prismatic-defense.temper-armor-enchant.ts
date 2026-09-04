import type { TemperArmorEnchant } from "../../temper-armor-enchant.page-type.ts"

export const prismaticDefense = {
  id: "01a05fd4-d96c-761c-984c-cf81a1aac8c6",
  pageTypeSlug: "temper-armor-enchant",
  slug: "prismatic-defense",
  title: "Prismatic Defense",
  key: "prismatic-defense",
  effect: "Increases Maximum Health, Magicka, and Stamina",
  glyphName: "Glyph of Prismatic Defense",
  essenceRune: "Hakeijo",
  esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_PRISMATIC_DEFENSE",
  displayOrder: 4,
  effects: "jsonl",
  qualityValues: "jsonl",
} as const satisfies TemperArmorEnchant
