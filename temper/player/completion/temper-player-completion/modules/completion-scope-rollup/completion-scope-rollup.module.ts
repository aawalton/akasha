import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const completionScopeRollup = {
  id: "01a06326-436a-75d2-8ece-d1941d997a46",
  type: "page-type/module",
  slug: "completion-scope-rollup",
  definition: "what a scope of completion cards counts, and the three scopes added together",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One fold adds every scope.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A card that starts over each day is left out of an account or character scope.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every companion card counts.",
    },
  ],
  createdAt: "2026-09-02T17:24:07.146Z",
  updatedAt: "2026-09-22T10:08:47.000Z",
} as const satisfies Module
