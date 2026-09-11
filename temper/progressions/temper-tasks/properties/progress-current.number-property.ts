import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export const progressCurrent = {
  id: "01a05fd3-435e-7786-ae6f-f5ee9cb17092",
  type: "number-property",
  slug: "progress-current",
  propertySlug: "progress-current",
  definition: "how many of the total are done so far",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
