import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const perfectedMercilessCharge = {
  id: "019e6484-5fc1-7768-9bf0-bb6c124a27d6",
  type: "temper-set",
  slug: "perfected-merciless-charge",
  title: "Perfected Merciless Charge",
  key: "perfected-merciless-charge",
  esoSetId: 522,
  subcategoryId: "arena",
  valid: ["greatsword", "battleaxe", "maul"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
