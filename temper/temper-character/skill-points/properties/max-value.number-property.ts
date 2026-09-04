import type { NumberProperty } from "@akasha/pages-system/number-property"

export type MaxValue = number

export const maxValue = {
  id: "01a05fcd-f559-7903-a727-087d4df5c67e",
  pageTypeSlug: "number-property",
  slug: "max-value",
  propertySlug: "max-value",
  definition: "the highest a source counts up to",
  max: null,
} as const satisfies NumberProperty
