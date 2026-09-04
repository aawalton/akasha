import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const searchTreasureMapFilter = {
  id: "01a0613a-e0b2-781d-8d0c-4d7734b29a2b",
  pageTypeSlug: "module",
  slug: "search-treasure-map-filter",
  definition: "whether an item is a treasure map, narrowed by an include or exclude toggle",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A treasure map is client specialized item type 100.",
    },
    {
      invariantKind: "departure",
      statement:
        "An item with no specialized item type fails the toggle whichever setting the player chose.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here narrows the server request.",
    },
  ],
} as const satisfies Module
