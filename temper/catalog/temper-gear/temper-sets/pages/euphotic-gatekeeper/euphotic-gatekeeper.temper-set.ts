import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const euphoticGatekeeper = {
  id: "019e6484-5ff6-7fa1-943a-2d85b41f0363",
  type: "temper-set",
  slug: "euphotic-gatekeeper",
  title: "Euphotic Gatekeeper",
  key: "euphotic-gatekeeper",
  esoSetId: 667,
  subcategoryId: "monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
