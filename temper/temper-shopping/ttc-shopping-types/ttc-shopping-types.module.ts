import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const ttcShoppingTypes = {
  id: "01a060cf-b0af-7126-9b58-710f57b008b6",
  pageTypeSlug: "module",
  slug: "ttc-shopping-types",
  definition: "the shapes a shopping plan and the parts of a shopping plan take",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An item to shop for carries the key one recommendation comes back under.",
    },
    {
      invariantKind: "departure",
      statement: "A budget strategy is a multiplier over the cheapest price found.",
    },
    {
      invariantKind: "departure",
      statement: "A plan keeps every listing passed over as an alternative.",
    },
  ],
} as const satisfies Module
