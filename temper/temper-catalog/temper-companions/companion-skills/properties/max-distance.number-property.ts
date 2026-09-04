import type { NumberProperty } from "@akasha/pages-system/number-property"

export type MaxDistance = number

export const maxDistance = {
  id: "01a06193-6caf-7297-88d0-6892f0580f21",
  pageTypeSlug: "number-property",
  slug: "max-distance",
  propertySlug: "max-distance",
  definition: "the furthest range a test holds at",
  max: null,
} as const satisfies NumberProperty
