import type { TemperSet } from "../../temper-set.page-type.ts"

export const spellPowerCure = {
  id: "019e66e6-a0c5-78d4-b3b7-3be827a65f27",
  pageTypeSlug: "temper-set",
  slug: "spell-power-cure",
  title: "Spell Power Cure",
  key: "spell-power-cure",
  esoSetId: 185,
  subcategoryId: "dungeon",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
