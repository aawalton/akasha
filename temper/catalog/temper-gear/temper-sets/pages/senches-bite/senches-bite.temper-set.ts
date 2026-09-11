import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const senchesBite = {
  id: "019e66e7-6a84-7a17-8997-cd3a95c7f098",
  type: "temper-set",
  slug: "senches-bite",
  title: "Senche's Bite",
  key: "senches-bite",
  esoSetId: 90,
  subcategoryId: "overland",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
