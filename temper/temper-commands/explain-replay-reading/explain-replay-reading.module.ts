import type { Module } from "@akasha/code-system/module"

export const explainReplayReading = {
  id: "01a06864-aa2b-7005-8de7-99cdead2fd47",
  pageTypeSlug: "module",
  slug: "explain-replay-reading",
  definition: "the last rule walk the inventory addon recorded in the game, read back for replay",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The walk is read back as the addon recorded it rather than run again on this side.",
    },
    {
      invariantKind: "departure",
      statement: "The trace is ruled on whole, so an unknown field refuses the read.",
    },
  ],
} as const satisfies Module
