import type { NumberProperty } from "@akasha/pages-system/number-property"

export type TotalSteps = number

export const totalSteps = {
  id: "01a06168-7245-7003-9baa-622ecb1ea0d4",
  pageTypeSlug: "number-property",
  slug: "total-steps",
  propertySlug: "total-steps",
  definition: "how many steps an achievement counts before the achievement is earned",
  max: null,
} as const satisfies NumberProperty
