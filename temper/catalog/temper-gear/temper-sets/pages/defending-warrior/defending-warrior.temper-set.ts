import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const defendingWarrior = {
  id: "019e66ec-7abb-796d-b848-44be964ff0d0",
  type: "temper-set",
  slug: "defending-warrior",
  title: "Defending Warrior",
  key: "defending-warrior",
  esoSetId: 138,
  subcategoryId: "trial",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
