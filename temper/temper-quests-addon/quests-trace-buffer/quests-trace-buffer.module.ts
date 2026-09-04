import type { Module } from "@akasha/code-system/module"

export const questsTraceBuffer = {
  id: "01a0635f-391c-740a-af70-4aa092d380b2",
  pageTypeSlug: "module",
  slug: "quests-trace-buffer",
  definition: "how many trace entries are kept, and which one goes when a new one arrives",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The buffer holds the number of entries the cap names.",
    },
    {
      invariantKind: "departure",
      statement: "The oldest entry goes first when the buffer is full.",
    },
    {
      invariantKind: "departure",
      statement: "Appending returns a new list rather than changing the one handed in.",
    },
    {
      invariantKind: "departure",
      statement: "The shape of an entry is stated where the trace is read back.",
    },
  ],
} as const satisfies Module
