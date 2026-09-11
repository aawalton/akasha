import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const telvanniEnforcer = {
  id: "019e66e6-a0d2-780d-bc7f-8b995fab4265",
  type: "temper-set",
  slug: "telvanni-enforcer",
  title: "Telvanni Enforcer",
  key: "telvanni-enforcer",
  esoSetId: 682,
  subcategoryId: "dungeon",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
