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
        "An item key is resolved here from the item name only for motif books and scripts.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A recipe's key is resolved beside this, so an add-on compiles no recipe table.",
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
    {
      decisionKind: "decision-kind/departure",
      statement: "An item was crafted today where its first sighting falls on the ESO day of now.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A crafted item a reading caught before the addon stamped it was crafted before today.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A crafted item read with no second named for now is not known to be crafted today.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A crafted item a reading caught before the addon asked about writs is needed by none.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An item nobody crafted is neither crafted today nor needed for a daily writ.",
    },
  ],
  createdAt: "2026-09-02T08:24:13.408Z",
  updatedAt: "2026-10-28T18:42:46.817Z",
} as const satisfies Module
