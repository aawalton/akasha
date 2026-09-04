import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const buildItemFactsFromInventoryItem = {
  id: "01a06137-f960-762e-920f-bb17bcdd1294",
  pageTypeSlug: "module",
  slug: "build-item-facts-from-inventory-item",
  definition:
    "the evaluable facts of one item, projected out of the game client's inventory item record",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Every category chain gets ALL_CATEGORIES_ID prepended ahead of the caller's node ids.",
    },
    {
      invariantKind: "departure",
      statement:
        "An item key is resolved from the item name only for recipes and motif books and scripts.",
    },
    {
      invariantKind: "departure",
      statement:
        "Potion effect metric ids come from the potionData field parsed out of the item link.",
    },
    {
      invariantKind: "absence",
      statement: "An item type the resolver does not name is left with no item key.",
    },
  ],
} as const satisfies Module
