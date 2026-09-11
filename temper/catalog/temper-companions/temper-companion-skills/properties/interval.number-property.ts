import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export const interval = {
  id: "01a06193-6ca9-7236-9c1e-b0e4e1e7eec8",
  type: "number-property",
  slug: "interval",
  propertySlug: "interval",
  definition: "how many seconds fall between one firing of a periodic trigger and the next",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
