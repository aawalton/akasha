import type { NumberProperty } from "@akasha/pages-system/number-property"

export type Interval = number

export const interval = {
  id: "01a06193-6ca9-7236-9c1e-b0e4e1e7eec8",
  pageTypeSlug: "number-property",
  slug: "interval",
  propertySlug: "interval",
  definition: "how many seconds fall between one firing of a periodic trigger and the next",
  max: null,
} as const satisfies NumberProperty
