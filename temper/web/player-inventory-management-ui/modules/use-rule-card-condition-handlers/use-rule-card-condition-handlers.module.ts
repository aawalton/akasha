import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const useRuleCardConditionHandlers = {
  id: "01a0636c-5da1-7e9a-8fbb-687bd452006b",
  type: "page-type/module",
  slug: "use-rule-card-condition-handlers",
  definition: "what a reader's change to a rule's condition does",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A location is kept only where the location filter lists its value.",
    },
  ],
  createdAt: "2026-09-02T18:40:41.377Z",
  updatedAt: "2026-09-27T10:00:48.000Z",
} as const satisfies Module
