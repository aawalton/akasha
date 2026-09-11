import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const shieldBreaker = {
  id: "019e66ec-7900-7679-bda1-f878b25f38bb",
  type: "temper-set",
  slug: "shield-breaker",
  title: "Shield Breaker",
  key: "shield-breaker",
  esoSetId: 199,
  subcategoryId: "pvp",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
