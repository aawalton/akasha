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
  createdAt: "2026-09-02T21:56:24.172Z",
  updatedAt: "2026-09-26T18:53:02.000Z",
} as const satisfies Module
