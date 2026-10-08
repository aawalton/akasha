import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const metrics = {
  id: "01a06131-abb7-7c5f-81a0-69154a33d704",
  type: "page-type/module",
  slug: "metrics",
  definition: "every character stat indexed by its id, as last read from the stat pages",
  code: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One catalogue is held at a time, and a new reading replaces it whole.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Asking for the catalogue before it is read is refused rather than answered empty.",
    },
  ],
  createdAt: "2026-09-02T08:17:20.311Z",
  updatedAt: "2026-09-26T16:01:50.000Z",
} as const satisfies Module
