import type { NumberProperty } from "@akasha/pages-system/number-property"

export type ConditionalMultiplier = number

export const conditionalMultiplier = {
  id: "01a06193-6cab-770f-a188-54931a2fd3fd",
  pageTypeSlug: "number-property",
  slug: "conditional-multiplier",
  propertySlug: "conditional-multiplier",
  definition: "what an effect's value is multiplied by while its tests hold",
  max: null,
} as const satisfies NumberProperty
