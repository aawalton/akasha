import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export const totalSteps = {
  id: "01a06168-7245-7003-9baa-622ecb1ea0d4",
  type: "number-property",
  slug: "total-steps",
  propertySlug: "total-steps",
  definition: "how many steps an achievement counts before the achievement is earned",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
