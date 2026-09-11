import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const warriorsFury = {
  id: "019e66ec-79ee-7215-9afe-22fb2e017f84",
  type: "temper-set",
  slug: "warriors-fury",
  title: "Warrior's Fury",
  key: "warriors-fury",
  esoSetId: 239,
  subcategoryId: "pvp",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
