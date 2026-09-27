import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const shoppingListGrouping = {
  id: "01a063a1-8cc1-7005-876e-c44fdd6786cf",
  type: "page-type/module",
  slug: "shopping-list-grouping",
  definition: "shopping needs put into categories and into the items missing a price",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A category is named by its item category tree slug, and the screen reads its title.",
    },
  ],
} as const satisfies Module
