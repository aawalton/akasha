import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export const targetRadius = {
  id: "01a06193-6cac-7448-823a-98e679dfdb1a",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "target-radius",
  propertySlug: "radius",
  definition: "how wide an effect spreads from where it lands",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
