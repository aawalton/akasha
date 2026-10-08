import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const staticItemKey = {
  id: "01a0df56-363b-78c4-9eb5-4c44d2a0c28d",
  type: "page-type/module",
  slug: "static-item-key",
  definition: "the knowledge key an item has, found from its name on the server and in a browser",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A recipe is keyed by the item the recipe makes, found from the recipe catalogue.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A recipe the catalogue does not name is keyed by its own item id.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No add-on reaches this, since an add-on reads a recipe's result off the game.",
    },
  ],
  createdAt: "2026-09-26T20:09:24.283Z",
  updatedAt: "2026-09-26T20:09:40.000Z",
} as const satisfies Module
