import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryParserHouse = {
  id: "01a18400-2d58-71da-9e7e-b802e7587f87",
  type: "page-type/module",
  slug: "inventory-parser-house",
  definition: "a house and the furnishings placed in it, read out of a capture",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A house read with no collectible id or no house id is no house.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A furnishing limit read without both its limit and its placed count is left off.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A bound placed furnishing keeps no price.",
    },
  ],
  createdAt: "2026-10-28T19:32:46.552Z",
  updatedAt: "2026-10-28T19:32:46.552Z",
} as const satisfies Module
