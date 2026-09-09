import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const itemBrowserItems = {
  id: "01a06178-371f-7441-8cab-2f74d08e70ab",
  pageTypeSlug: "module",
  slug: "item-browser-items",
  definition: "every item set the browser knows, gathered in order from three parts",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A row's place in this table is the order the set list is built in.",
    },
    {
      invariantKind: "departure",
      statement: "These rows are a frozen port of an upstream table.",
    },
    {
      invariantKind: "gap",
      statement: "No program in this repository rebuilds these rows.",
    },
  ],
} as const satisfies Module
