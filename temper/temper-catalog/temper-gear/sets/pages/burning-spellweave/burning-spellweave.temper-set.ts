import type { TemperSet } from "../../temper-set.page-type.ts"

export const burningSpellweave = {
  id: "019e66e6-a066-7813-b855-a2bdd3ccb862",
  pageTypeSlug: "temper-set",
  slug: "burning-spellweave",
  title: "Burning Spellweave",
  key: "burning-spellweave",
  esoSetId: 160,
  subcategoryId: "dungeon",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
