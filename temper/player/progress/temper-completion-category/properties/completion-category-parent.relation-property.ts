import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const completionCategoryParent = {
  id: "01a0cae0-68ce-716e-9958-296e965e8ca5",
  type: "page-type/relation-property",
  slug: "completion-category-parent",
  propertySlug: "parent",
  definition: "the category a completion category hangs beneath",
  targetPageType: "page-type/temper-completion-category",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A category stating no category above it is a heading.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
