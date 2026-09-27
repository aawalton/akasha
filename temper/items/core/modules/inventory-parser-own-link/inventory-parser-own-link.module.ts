import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryParserOwnLink = {
  id: "01a0e173-815b-79b9-a56f-35777ee82907",
  type: "page-type/module",
  slug: "inventory-parser-own-link",
  definition: "the values an item's own link was read with, kept off a capture",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An item keeps a weapon power or armor rating only where the capture's is above 0.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An item keeps its use ability only where the capture names its header and text.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A set bonus with no text is dropped, and an item left with none keeps no list.",
    },
  ],
} as const satisfies Module
