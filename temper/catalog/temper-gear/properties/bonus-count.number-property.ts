import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export const bonusCount = {
  id: "01a05fd1-d436-7f9e-bfcc-cfbbe3c44331",
  type: "number-property",
  slug: "bonus-count",
  propertySlug: "count",
  definition: "how many pieces of a set are worn before a bonus is given",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
