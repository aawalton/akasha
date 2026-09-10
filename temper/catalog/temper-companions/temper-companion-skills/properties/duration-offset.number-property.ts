import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export const durationOffset = {
  id: "01a06193-6ca7-73e3-a529-3572c94a9221",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "duration-offset",
  propertySlug: "duration-offset",
  definition: "how many seconds an effect's ticks sit away from the cast",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
