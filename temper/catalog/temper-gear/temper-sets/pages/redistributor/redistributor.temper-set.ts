import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const redistributor = {
  id: "019e668e-9a5e-7f24-beba-944d62bfc8b4",
  type: "temper-set",
  slug: "redistributor",
  title: "Redistributor",
  key: "redistributor",
  esoSetId: 177,
  subcategoryId: "crafted",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
