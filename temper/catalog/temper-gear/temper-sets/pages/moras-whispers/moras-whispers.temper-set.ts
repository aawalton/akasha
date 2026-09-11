import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const morasWhispers = {
  id: "019e6484-6031-7a65-80fd-18f965f0ea8a",
  type: "temper-set",
  slug: "moras-whispers",
  title: "Mora's Whispers",
  key: "moras-whispers",
  esoSetId: 654,
  subcategoryId: "mythic",
  valid: ["shoulders:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
