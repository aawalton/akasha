import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryParserName = {
  id: "01a18400-2d59-7a02-a943-22feeddc8933",
  type: "page-type/module",
  slug: "inventory-parser-name",
  definition: "the name an item read out of a capture is given",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A name loses the game's grammar suffix and is written in title case.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A short word past the first stays lower case.",
    },
  ],
  createdAt: "2026-10-28T19:32:46.552Z",
  updatedAt: "2026-10-28T19:32:46.552Z",
} as const satisfies Module
