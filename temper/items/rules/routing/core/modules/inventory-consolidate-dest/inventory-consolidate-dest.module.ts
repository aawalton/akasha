import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryConsolidateDest = {
  id: "01a06151-3707-766e-bfa9-91d05b3b9c5c",
  type: "page-type/module",
  slug: "inventory-consolidate-dest",
  definition: "whether a destination gathers a thing from every character into one place",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A destination gathering stock is known by the name the destination has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every move between storages goes through the storage carrier, first on the priority list.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Moves into a gathering place, and moves from shared storage into the bank, are such moves.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Erin Solstice heads the priority list, so Erin carries every such move.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A house a furnishing is placed in gathers furnishings, so Erin carries it there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Only the storage carrier acts at the guild bank, house storage, the furniture vault or a house.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Another character holding an item bound for a gathering place puts it in the bank for the carrier.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Where no priority list is known, whoever is playing carries storage.",
    },
  ],
  createdAt: "2026-09-02T08:51:47.591Z",
  updatedAt: "2026-11-01T19:38:20.097Z",
} as const satisfies Module
