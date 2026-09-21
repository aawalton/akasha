import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const progressTotal = {
  id: "01a05fd3-435f-7b63-9969-777d0b5afac0",
  type: "page-type/number-property",
  slug: "progress-total",
  propertySlug: "progress-total",
  definition: "how many there are to do in all",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
