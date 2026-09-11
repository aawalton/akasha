import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export const effectValue = {
  id: "01a05fb0-3cec-73aa-81be-f0042d45fb19",
  type: "number-property",
  slug: "effect-value",
  propertySlug: "value",
  definition: "how far an effect moves the metric the effect names",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
