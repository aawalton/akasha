import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionStatsCalculator = {
  id: "01a06152-c2d5-77e5-9a6a-ff12bc141904",
  type: "module",
  slug: "companion-stats-calculator",
  definition: "entry point resolving a reference baseline before calculating companion stats",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The wrapper exists only to default the baseline argument.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "An omitted baseline is resolved through getReferenceBaseline on every call.",
    },
  ],
} as const satisfies Module
