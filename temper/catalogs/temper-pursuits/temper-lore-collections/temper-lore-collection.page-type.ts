import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const temperLoreCollection = {
  id: "01a06343-f9f7-7005-838d-006a4cec0e4f",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-lore-collection",
  definition: "a grouping the game files lore library books under",
  pluralSlug: "temper-lore-collections",
  extends: ["page-type/temper-pursuit-thing"],
  parts: [
    "number-property/book-index",
    "number-property/eso-collection-index",
    "number-property/eso-lore-category-id",
    "page-property-entry/books",
    "text-property/book-name",
  ],
  properties: [
    { pageProperty: "number-property/eso-lore-category-id", required: true, many: false },
    { pageProperty: "number-property/eso-collection-index", required: true, many: false },
    { pageProperty: "page-property-entry/books", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A collection is numbered inside its lore category rather than across all the lore categories.",
    },
    {
      invariantKind: "departure",
      statement: "Shalidor's Library is lore category 1.",
    },
  ],
  types: "ts",
} as const satisfies PageType
