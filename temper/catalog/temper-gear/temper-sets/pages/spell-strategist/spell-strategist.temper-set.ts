import type { TemperSet } from "../../temper-set.page-type.types.ts"

export const spellStrategist = {
  id: "019e66ec-7946-7c36-a19a-cbde43c47c67",
  pageTypeSlug: "temper-set",
  type: "temper-set",
  slug: "spell-strategist",
  title: "Spell Strategist",
  key: "spell-strategist",
  esoSetId: 418,
  subcategoryId: "pvp",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
