import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const classifyItem = {
  id: "01a060e4-b745-7869-bf3d-8c96e819e7d4",
  type: "page-type/module",
  slug: "classify-item",
  definition: "the branch of the item category tree an item belongs under, named all the way down",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Treasure maps, survey reports, master writs and holiday writs fall under tasks, never containers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An item is tried against the roots it is handed, in the order they are handed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An item no branch takes falls under the tree's miscellaneous and other branches.",
    },
  ],
} as const satisfies Module
