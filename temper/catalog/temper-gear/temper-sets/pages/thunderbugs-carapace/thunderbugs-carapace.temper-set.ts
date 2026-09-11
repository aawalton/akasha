import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const thunderbugsCarapace = {
  id: "019e66e7-6a9e-76b3-9089-a0a4054a9a45",
  type: "temper-set",
  slug: "thunderbugs-carapace",
  title: "Thunderbug's Carapace",
  key: "thunderbugs-carapace",
  esoSetId: 30,
  subcategoryId: "overland",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
