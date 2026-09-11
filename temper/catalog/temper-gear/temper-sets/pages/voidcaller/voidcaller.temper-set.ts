import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const voidcaller = {
  id: "019e66e7-6aa9-7dcb-8aab-e65afd08ce04",
  type: "temper-set",
  slug: "voidcaller",
  title: "Voidcaller",
  key: "voidcaller",
  esoSetId: 537,
  subcategoryId: "overland",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
