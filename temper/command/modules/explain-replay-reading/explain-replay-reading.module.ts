import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const explainReplayReading = {
  id: "01a06864-aa2b-7005-8de7-99cdead2fd47",
  type: "module",
  slug: "explain-replay-reading",
  definition: "the last rule walk the inventory addon recorded in the game, read back for replay",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The walk is read back as the addon recorded that walk rather than run again on this side.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The trace is ruled on whole.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An unknown field refuses the read.",
    },
  ],
} as const satisfies Module
