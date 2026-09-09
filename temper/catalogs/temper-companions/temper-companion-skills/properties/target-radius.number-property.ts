import type { NumberProperty } from "@akasha/pages/number-property"

export type TargetRadius = number

export const targetRadius = {
  id: "01a06193-6cac-7448-823a-98e679dfdb1a",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "target-radius",
  propertySlug: "radius",
  definition: "how wide an effect spreads from where it lands",
  max: null,
} as const satisfies NumberProperty
