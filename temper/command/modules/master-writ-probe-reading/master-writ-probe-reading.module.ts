import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const masterWritProbeReading = {
  id: "01a06864-aa2b-7004-b089-84cb8530cec4",
  type: "page-type/module",
  slug: "master-writ-probe-reading",
  definition: "the probe the inventory addon records for the master writs it has",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The probe is ruled on whole.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An unknown field refuses the read.",
    },
  ],
  createdAt: "2026-09-03T17:50:22.763Z",
  updatedAt: "2026-09-15T18:38:43.000Z",
} as const satisfies Module
