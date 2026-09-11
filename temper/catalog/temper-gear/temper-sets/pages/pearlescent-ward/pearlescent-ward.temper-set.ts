import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const pearlescentWard = {
  id: "019e66ec-7bf0-7b9c-bc27-9de8456cd082",
  type: "temper-set",
  slug: "pearlescent-ward",
  title: "Pearlescent Ward",
  key: "pearlescent-ward",
  esoSetId: 648,
  subcategoryId: "trial",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
