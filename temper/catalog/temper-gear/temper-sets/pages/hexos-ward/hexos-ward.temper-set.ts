import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const hexosWard = {
  id: "019e66e7-6a66-76ca-9db6-a943c71c9f29",
  type: "temper-set",
  slug: "hexos-ward",
  title: "Hexos' Ward",
  key: "hexos-ward",
  esoSetId: 614,
  subcategoryId: "overland",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
