import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const metricEffectType = {
  id: "01a0deff-4b82-749f-9c2c-486c7b603ff5",
  type: "page-type/text-property",
  slug: "metric-effect-type",
  propertySlug: "effect-type",
  definition: "the kind of effect a stat stating no formula sums",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  types: "ts",
} as const satisfies TextProperty
