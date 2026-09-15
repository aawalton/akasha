import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionStatsResult = {
  id: "01a06152-c2d5-7ab0-8fbc-0bc1a946bf56",
  type: "module",
  slug: "companion-stats-result",
  definition: "the result shape returned by a companion stat calculation",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The interface sits alone in a module to break the cycle between calculator and optimizer.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The metrics field is a partial record keyed by CompanionMetricId.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The rotation field admits null.",
    },
  ],
} as const satisfies Module
