import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const completionCategoryTreeTypes = {
  id: "01a06103-0616-7f27-96d8-71e47e9fde8f",
  type: "page-type/module",
  slug: "completion-category-tree-types",
  definition: "the shape of a node in the completion category tree, and its tabs",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here runs.",
    },
  ],
} as const satisfies Module
