import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const companionStatsResult = {
  id: "01a06152-c2d5-7ab0-8fbc-0bc1a946bf56",
  type: "module",
  slug: "companion-stats-result",
  definition: "the result shape returned by a companion stat calculation",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The interface sits alone in a module to break the cycle between calculator and optimizer.",
    },
    {
      invariantKind: "constraint",
      statement: "The metrics field is a partial record keyed by CompanionMetricId.",
    },
    {
      invariantKind: "constraint",
      statement: "The rotation field admits null.",
    },
  ],
} as const satisfies Module
