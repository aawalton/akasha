import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const masterCraftTraceReading = {
  id: "01a06864-aa2b-7003-afed-089f9baeaad7",
  type: "page-type/module",
  slug: "master-craft-trace-reading",
  definition: "the traces the inventory addon records for each master writ it tries to craft",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every trace names the outcome that ended that trace.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The traces are read as a list.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run that crafted nothing answers empty rather than absent.",
    },
  ],
  createdAt: "2026-09-03T17:50:22.763Z",
  updatedAt: "2026-09-15T18:38:43.000Z",
} as const satisfies Module
