import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const itemBrowserSearch = {
  id: "01a0c519-f9e3-7855-b044-77d8cfd9c3cd",
  type: "page-type/module",
  slug: "item-browser-search",
  definition: "whether a row of the item set list answers what was typed in the search box",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A vertical bar parts the search text into fragments, and any fragment matching wins.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A minus before a set bonus query bars the rows that bonus matches.",
    },
  ],
} as const satisfies Module
