import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const itemCategoryParent = {
  id: "01a0cae0-e5ff-7843-96e5-b49bc28783d9",
  type: "page-type/relation-property",
  slug: "item-category-parent",
  propertySlug: "parent",
  definition: "the category an item category hangs beneath",
  targetPageType: "page-type/temper-item-category-tree",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A category stating no category above it is a root of the tree.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-22T20:48:51.711Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies RelationProperty
