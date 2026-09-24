import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryDatabaseShape = {
  id: "01a0d5b6-43b6-77aa-8216-966a0d5e77c2",
  type: "page-type/module",
  slug: "inventory-database-shape",
  definition: "the zod shape an inventory read outside the game is parsed through",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This shape and an inventory's shape are held equal at typecheck.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The game holds no zod, so no add-on compiles this module.",
    },
  ],
} as const satisfies Module
