import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export type EsoTraitNum = number

export const esoTraitNum = {
  id: "01a05fd1-d43a-72e7-b4d2-ee4f35424585",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "eso-trait-num",
  propertySlug: "eso-trait-num",
  definition: "the number The Elder Scrolls Online names a trait by",
  max: null,
} as const satisfies NumberProperty
