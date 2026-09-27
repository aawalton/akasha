import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const searchItemTypeFilter = {
  id: "01a0613a-e0a9-7142-b5d9-3ca6d7ec3c1f",
  type: "page-type/module",
  slug: "search-item-type-filter",
  definition: "the item type, narrowed by a multiselect of the item type pages",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The item type filter also adds the selected type numbers to the server request.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each option is an item type page's title under its ITEMTYPE number.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "An item type with no page is not offered.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An item with no item type fails a non-empty selection.",
    },
  ],
} as const satisfies Module
