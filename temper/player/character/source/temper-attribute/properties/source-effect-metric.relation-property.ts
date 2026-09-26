import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const sourceEffectMetric = {
  id: "01a0df4d-9bd8-7daf-bbeb-7c077b1abf94",
  type: "page-type/relation-property",
  slug: "source-effect-metric",
  propertySlug: "metric",
  definition: "the stat an effect source moves",
  targetPageType: "page-type/temper-metric",
  types: "ts",
} as const satisfies RelationProperty
