import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const nextBossState = {
  id: "01a06157-8356-706b-948b-6f8dae0434bf",
  type: "page-type/module",
  slug: "next-boss-state",
  definition: "the one table every part of this tracker reads and writes",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One table has the state this tracker keeps.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The table is declared whole and filled in by the modules that own each part.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "The table is cast rather than built.",
    },
  ],
} as const satisfies Module
