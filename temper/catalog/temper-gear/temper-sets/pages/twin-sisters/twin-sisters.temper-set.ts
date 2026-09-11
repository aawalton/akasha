import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const twinSisters = {
  id: "019e66e7-6aa0-7cf5-bd2f-9619798b3bf1",
  type: "temper-set",
  slug: "twin-sisters",
  title: "Twin Sisters",
  key: "twin-sisters",
  esoSetId: 105,
  subcategoryId: "overland",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
