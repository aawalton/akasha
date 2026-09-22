import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const qualityValue = {
  id: "01a05fb0-3cee-7f1e-8bbd-94e3d71ce18e",
  type: "page-type/number-property",
  slug: "quality-value",
  propertySlug: "value",
  definition: "what a thing is worth at a grade",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
