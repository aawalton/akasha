import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const completionAccountNodes = {
  id: "01a0d89f-db39-753f-bf3d-3dc6f240a7f5",
  type: "page-type/module",
  slug: "completion-account-nodes",
  definition: "the counts an account panel shows, as a tree of nodes",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An account panel draws these nodes rather than counting for itself.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An account checker counts from the same nodes the panel draws.",
    },
  ],
} as const satisfies Module
