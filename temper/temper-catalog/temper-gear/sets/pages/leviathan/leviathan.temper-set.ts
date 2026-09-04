import type { TemperSet } from "../../temper-set.page-type.ts"

export const leviathan = {
  id: "019e66e6-a09e-7e77-a4ee-eebf4398b2fa",
  pageTypeSlug: "temper-set",
  slug: "leviathan",
  title: "Leviathan",
  key: "leviathan",
  esoSetId: 302,
  subcategoryId: "dungeon",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
