import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const completionProgressNodes = {
  id: "01a0d89f-db3a-7b62-9360-260a5aa1ace1",
  type: "page-type/module",
  slug: "completion-progress-nodes",
  definition: "a tree of counts, and how far along that tree is at a path",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A path names nodes by key, and a path naming no node has no progress.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A branch counts as the sum of the leaves beneath it.",
    },
  ],
} as const satisfies Module
