import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const browserCategoryParent = {
  id: "01a0e10a-51a5-7ea8-87f9-3a385664764b",
  type: "page-type/relation-property",
  slug: "browser-category-parent",
  propertySlug: "parent",
  definition: "the item browser category a subfilter sits beneath",
  targetPageType: "page-type/temper-browser-category",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A category stating no category above it is a top category of the browser.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
