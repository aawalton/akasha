import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const itemBrowserItems3 = {
  id: "01a06178-371f-75d6-801d-356fb33ed5a5",
  pageTypeSlug: "module",
  slug: "item-browser-items-3",
  definition: "the last third of the item set rows, in the order upstream wrote them",
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
