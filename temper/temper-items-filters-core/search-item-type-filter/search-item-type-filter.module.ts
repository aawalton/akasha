import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const searchItemTypeFilter = {
  id: "01a0613a-e0a9-7142-b5d9-3ca6d7ec3c1f",
  pageTypeSlug: "module",
  slug: "search-item-type-filter",
  definition: "the item type, narrowed by a multiselect of twenty client item-type numbers",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The item type filter also adds the selected type numbers to the server request.",
    },
    {
      invariantKind: "absence",
      statement:
        "The option list names twenty item types rather than every item type the client defines.",
    },
    {
      invariantKind: "departure",
      statement: "An item with no item type fails a non-empty selection.",
    },
  ],
} as const satisfies Module
