import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const belharzasBand = {
  id: "019e6484-6026-798d-a062-476c6c37f56b",
  type: "temper-set",
  slug: "belharzas-band",
  title: "Belharza's Band",
  key: "belharzas-band",
  esoSetId: 626,
  subcategoryId: "mythic",
  valid: ["ring"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
