import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export const maxValue = {
  id: "01a05fcd-f559-7903-a727-087d4df5c67e",
  type: "number-property",
  slug: "max-value",
  propertySlug: "max-value",
  definition: "the highest a source counts up to",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
