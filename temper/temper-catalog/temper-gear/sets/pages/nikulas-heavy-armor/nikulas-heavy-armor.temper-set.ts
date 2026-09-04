import type { TemperSet } from "../../temper-set.page-type.ts"

export const nikulasHeavyArmor = {
  id: "019e66e6-a0a7-7a85-989a-f4784908d789",
  pageTypeSlug: "temper-set",
  slug: "nikulas-heavy-armor",
  title: "Nikulas' Heavy Armor",
  key: "nikulas-heavy-armor",
  esoSetId: 72,
  subcategoryId: "dungeon",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
