import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const metricTree = {
  id: "01a0d89c-8d0f-761e-97e4-9da2a32bd2fd",
  type: "page-type/module",
  slug: "metric-tree",
  definition: "the character stat display tree, seven categories deep down to single stat leaves",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The tree is built from the metric-tree pages the bundler's glob finds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A node is placed under the node its page names as parent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The nodes under one parent, and the categories, are in the order of their display order.",
    },
  ],
} as const satisfies Module
