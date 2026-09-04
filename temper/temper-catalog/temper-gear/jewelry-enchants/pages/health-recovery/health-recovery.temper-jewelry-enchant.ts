import type { TemperJewelryEnchant } from "../../temper-jewelry-enchant.page-type.ts"

export const healthRecovery = {
  id: "019e5c85-d949-7117-b9fc-f50cc02b56ed",
  pageTypeSlug: "temper-jewelry-enchant",
  slug: "health-recovery",
  title: "Health Recovery",
  key: "health-recovery",
  effect: "Increases Health Recovery",
  glyphName: "Glyph of Health Recovery",
  essenceRune: "Okoma",
  esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_HEALTH_REGEN",
  displayOrder: 5,
  effects: "jsonl",
  qualityValues: "jsonl",
} as const satisfies TemperJewelryEnchant
