import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const useCompanionStatsCalculation = {
  id: "01a0641f-8bec-7676-815f-cf8474c5046d",
  type: "page-type/module",
  slug: "use-companion-stats-calculation",
  definition: "a companion's stats, worked out from its build",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A companion's stats are worked out again when the stat pages are read again.",
    },
  ],
} as const satisfies Module
