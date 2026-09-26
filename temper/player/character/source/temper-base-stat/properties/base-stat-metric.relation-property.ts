import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const baseStatMetric = {
  id: "01a0df46-e492-70d2-abeb-f7b819283a2c",
  type: "page-type/relation-property",
  slug: "base-stat-metric",
  propertySlug: "metric",
  definition: "the stat a base stat moves",
  targetPageType: "page-type/temper-metric",
  types: "ts",
} as const satisfies RelationProperty
