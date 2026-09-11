import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const moondancer = {
  id: "019e66ec-7bc4-79ba-ba61-1550a3721a0f",
  type: "temper-set",
  slug: "moondancer",
  title: "Moondancer",
  key: "moondancer",
  esoSetId: 230,
  subcategoryId: "trial",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
