import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const inventorsGuard = {
  id: "019e66ec-7b6b-7879-9f1e-ca815f5825b4",
  type: "temper-set",
  slug: "inventors-guard",
  title: "Inventor's Guard",
  key: "inventors-guard",
  esoSetId: 333,
  subcategoryId: "trial",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
