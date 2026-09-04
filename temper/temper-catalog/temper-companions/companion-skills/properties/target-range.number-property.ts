import type { NumberProperty } from "@akasha/pages-system/number-property"

export type TargetRange = number

export const targetRange = {
  id: "01a06193-6cab-7234-80a7-375ffe81337b",
  pageTypeSlug: "number-property",
  slug: "target-range",
  propertySlug: "range",
  definition: "how far away an effect reaches",
  max: null,
} as const satisfies NumberProperty
