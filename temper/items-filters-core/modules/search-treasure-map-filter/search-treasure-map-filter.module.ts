import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const searchTreasureMapFilter = {
  id: "01a0613a-e0b2-781d-8d0c-4d7734b29a2b",
  type: "module",
  slug: "search-treasure-map-filter",
  definition: "whether an item is a treasure map, narrowed by an include or exclude toggle",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A treasure map is client specialized item type 100.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An item with no specialized item type fails the toggle whichever setting the player chose.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here narrows the server request.",
    },
  ],
} as const satisfies Module
