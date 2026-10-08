import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const explainReplayReading = {
  id: "01a06864-aa2b-7005-8de7-99cdead2fd47",
  type: "page-type/module",
  slug: "explain-replay-reading",
  definition: "the last rule walk the inventory addon recorded in the game, read back for replay",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The walk is read back as the addon recorded that walk rather than run again on this side.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The trace is ruled on whole.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An unknown field refuses the read.",
    },
  ],
  createdAt: "2026-09-03T17:50:22.763Z",
  updatedAt: "2026-09-15T18:38:43.000Z",
} as const satisfies Module
