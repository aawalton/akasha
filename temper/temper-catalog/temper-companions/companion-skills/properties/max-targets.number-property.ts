import type { NumberProperty } from "@akasha/pages-system/number-property"

export type MaxTargets = number

export const maxTargets = {
  id: "01a06193-6cac-75d7-b066-cd12eee37c99",
  pageTypeSlug: "number-property",
  slug: "max-targets",
  propertySlug: "max-targets",
  definition: "how many an effect lands on at once",
  max: null,
} as const satisfies NumberProperty
