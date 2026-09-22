import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const buildItemFactsFromInventoryItem = {
  id: "01a06137-f960-762e-920f-bb17bcdd1294",
  type: "page-type/module",
  slug: "build-item-facts-from-inventory-item",
  definition:
    "the evaluable facts of an item, projected out of the game client's inventory item record",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every category chain gets ALL_CATEGORIES_ID prepended ahead of the caller's node ids.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An item key is resolved from the item name only for recipes and motif books and scripts.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Potion effect metric ids come from the potionData field parsed out of the item link.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "An item type the resolver does not name is left with no item key.",
    },
  ],
} as const satisfies Module
