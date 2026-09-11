import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const wayOfTheArena = {
  id: "019e668e-9a74-785a-9079-bdb7c8f63bdf",
  type: "temper-set",
  slug: "way-of-the-arena",
  title: "Way of the Arena",
  key: "way-of-the-arena",
  esoSetId: 148,
  subcategoryId: "crafted",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
