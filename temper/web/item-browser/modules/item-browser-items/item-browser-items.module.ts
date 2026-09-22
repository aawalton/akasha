import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const itemBrowserItems = {
  id: "01a06178-371f-7441-8cab-2f74d08e70ab",
  type: "page-type/module",
  slug: "item-browser-items",
  definition: "every item set the browser knows, taken in order from three parts",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A row's place in this table is the order the set list is built in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "These rows are a frozen port of an upstream table.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "No program in this repository rebuilds these rows.",
    },
  ],
} as const satisfies Module
