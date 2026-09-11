import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const wiseMage = {
  id: "019e66ec-7f2a-7efc-bd43-829b854ad840",
  type: "temper-set",
  slug: "wise-mage",
  title: "Wise Mage",
  key: "wise-mage",
  esoSetId: 139,
  subcategoryId: "trial",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
