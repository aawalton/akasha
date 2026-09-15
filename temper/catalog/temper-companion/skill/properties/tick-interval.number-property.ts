import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const tickInterval = {
  id: "01a06193-6ca8-7471-9460-6a7a73360a6e",
  type: "page-type/number-property",
  slug: "tick-interval",
  propertySlug: "tick-interval",
  definition: "how many seconds fall between one tick of an effect and the next",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
