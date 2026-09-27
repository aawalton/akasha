import type { MultiRelationProperty } from "akasha/page/multi-relation-property/multi-relation-property.page-type.types.ts"

export const browserItemTypes = {
  id: "01a0e11e-6894-789b-a54a-940ad670a82e",
  type: "page-type/multi-relation-property",
  slug: "browser-item-types",
  propertySlug: "item-types",
  definition: "the sorts of item an item browser category takes",
  targetPageType: "page-type/temper-item-type",
  types: "ts",
} as const satisfies MultiRelationProperty
