import type { MultiRelationProperty } from "akasha/page/multi-relation-property/multi-relation-property.page-type.types.ts"

export const browserEquipTypes = {
  id: "01a0e11e-6893-7471-8d03-126f926ea69c",
  type: "page-type/multi-relation-property",
  slug: "browser-equip-types",
  propertySlug: "equip-types",
  definition: "the places a thing is worn an item browser category takes",
  targetPageType: "page-type/temper-equip-type",
  types: "ts",
} as const satisfies MultiRelationProperty
