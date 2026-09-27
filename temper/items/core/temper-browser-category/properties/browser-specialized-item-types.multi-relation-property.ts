import type { MultiRelationProperty } from "akasha/page/multi-relation-property/multi-relation-property.page-type.types.ts"

export const browserSpecializedItemTypes = {
  id: "01a0e11e-6894-7f7a-b60f-c81354c85d02",
  type: "page-type/multi-relation-property",
  slug: "browser-specialized-item-types",
  propertySlug: "specialized-item-types",
  definition: "the narrower sorts of item an item browser category takes",
  targetPageType: "page-type/temper-specialized-item-type",
  types: "ts",
} as const satisfies MultiRelationProperty
