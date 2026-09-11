import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const powerfulAssault = {
  id: "019e66ec-7877-7535-85fb-52bd0274a2be",
  type: "temper-set",
  slug: "powerful-assault",
  title: "Powerful Assault",
  key: "powerful-assault",
  esoSetId: 180,
  subcategoryId: "pvp",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
