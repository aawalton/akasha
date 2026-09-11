import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const syrabanesGrip = {
  id: "019e66e7-6a9a-76a8-86c0-b5e1c7ac5a8c",
  type: "temper-set",
  slug: "syrabanes-grip",
  title: "Syrabane's Grip",
  key: "syrabanes-grip",
  esoSetId: 57,
  subcategoryId: "overland",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
