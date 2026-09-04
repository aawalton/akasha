import type { NumberProperty } from "@akasha/pages-system/number-property"

export type ProgressTotal = number

export const progressTotal = {
  id: "01a05fd3-435f-7b63-9969-777d0b5afac0",
  pageTypeSlug: "number-property",
  slug: "progress-total",
  propertySlug: "progress-total",
  definition: "how many there are to do in all",
  max: null,
} as const satisfies NumberProperty
