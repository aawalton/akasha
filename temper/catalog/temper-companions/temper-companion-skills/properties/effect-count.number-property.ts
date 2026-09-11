import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export const effectCount = {
  id: "01a06193-6caa-74c2-81bc-6489c5339b9f",
  type: "number-property",
  slug: "effect-count",
  propertySlug: "count",
  definition: "how many times an effect happens",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
