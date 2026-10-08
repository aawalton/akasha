import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryFilterTypes = {
  id: "01a0636c-5d9a-7707-9767-560092ae0015",
  type: "page-type/module",
  slug: "inventory-filter-types",
  definition: "what an inventory filter and sort may have, and what admits a value",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Sort option names are web phrase pages, read through the phrase passed in.",
    },
  ],
  createdAt: "2026-09-02T18:40:41.370Z",
  updatedAt: "2026-09-27T11:43:09.000Z",
} as const satisfies Module
