import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const itemBrowserItems2 = {
  id: "01a06178-371f-7d1f-8642-f4b81de71247",
  pageTypeSlug: "module",
  slug: "item-browser-items-2",
  definition: "the second third of the item set rows, in the order upstream wrote them",
  code: "ts",
  invariants: [
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
