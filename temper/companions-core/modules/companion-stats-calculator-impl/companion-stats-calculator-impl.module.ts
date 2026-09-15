import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionStatsCalculatorImpl = {
  id: "01a06152-c2d5-7baf-a9bc-c8933bec82ac",
  type: "module",
  slug: "companion-stats-calculator-impl",
  definition: "the full companion stat calculation pass over sources, formula metrics and rotation",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The result interface is imported from companion-stats-result rather than declared here.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "Formula metrics are evaluated in topological order of their metric references.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "Six rotation metric ids are held out of the display pass by a hardcoded set.",
    },
  ],
} as const satisfies Module
