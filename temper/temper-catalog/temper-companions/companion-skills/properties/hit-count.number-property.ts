import type { NumberProperty } from "@akasha/pages-system/number-property"

export type HitCount = number

export const hitCount = {
  id: "01a06193-6caa-7ead-88b8-3e7783f4b8f6",
  pageTypeSlug: "number-property",
  slug: "hit-count",
  propertySlug: "hit-count",
  definition: "how many hits one cast lands",
  max: null,
} as const satisfies NumberProperty
