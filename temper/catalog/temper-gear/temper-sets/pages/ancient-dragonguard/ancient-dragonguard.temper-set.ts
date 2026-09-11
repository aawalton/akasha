import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const ancientDragonguard = {
  id: "019e668e-9a33-7663-b32a-1c8d34bcf124",
  type: "temper-set",
  slug: "ancient-dragonguard",
  title: "Ancient Dragonguard",
  key: "ancient-dragonguard",
  esoSetId: 469,
  subcategoryId: "crafted",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
