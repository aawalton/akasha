import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const itemSetCategories = {
  id: "01a090e4-4cd1-7dd9-9df4-7d5cf6c4caed",
  pageTypeSlug: "module",
  type: "module",
  slug: "item-set-categories",
  definition: "the category and subcategory the game hangs one item set collection under",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A set's category is the root of the category chain the client hangs the set under.",
    },
    {
      invariantKind: "departure",
      statement: "A category the game names as an empty string is no category.",
    },
    {
      invariantKind: "departure",
      statement: "A set the game hangs under no category has neither name.",
    },
  ],
} as const satisfies Module
