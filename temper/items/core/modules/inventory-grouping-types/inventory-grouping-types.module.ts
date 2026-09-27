import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryGroupingTypes = {
  id: "01a060c5-3c20-76ca-a588-a08622426e47",
  type: "page-type/module",
  slug: "inventory-grouping-types",
  definition: "an inventory row's grouping categories",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A grouping category is the slug of a root of the item category tree.",
    },
  ],
} as const satisfies Module
