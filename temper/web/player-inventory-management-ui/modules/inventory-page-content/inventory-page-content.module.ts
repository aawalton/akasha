import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryPageContent = {
  id: "01a0636c-5d9b-72e9-88ef-3bfdd616001b",
  type: "page-type/module",
  slug: "inventory-page-content",
  definition: "the whole inventory page a browser draws",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The page title and tab names are web phrase pages.",
    },
  ],
} as const satisfies Module
