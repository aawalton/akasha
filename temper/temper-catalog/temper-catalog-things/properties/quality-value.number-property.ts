import type { NumberProperty } from "@akasha/pages-system/number-property"

export type QualityValue = number

export const qualityValue = {
  id: "01a05fb0-3cee-7f1e-8bbd-94e3d71ce18e",
  pageTypeSlug: "number-property",
  slug: "quality-value",
  propertySlug: "value",
  definition: "what a thing is worth at one grade",
  max: null,
} as const satisfies NumberProperty
