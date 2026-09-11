import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const sharedBurden = {
  id: "019e66e7-6a1d-7e97-a936-9e0475278d7d",
  pageTypeSlug: "temper-set",
  type: "temper-set",
  slug: "shared-burden",
  title: "Shared Burden",
  key: "shared-burden",
  esoSetId: 808,
  subcategoryId: "no-type",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
