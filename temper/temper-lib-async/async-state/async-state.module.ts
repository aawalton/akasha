import type { Module } from "@akasha/code-system/module"

export const asyncState = {
  id: "01a0606a-1c57-75ad-a81f-1f1105255842",
  pageTypeSlug: "module",
  slug: "async-state",
  definition: "the library table, the job list and the scheduler counters every module reads",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every module reaches the same library table.",
    },
    {
      invariantKind: "departure",
      statement: "A job is held under the name of the task.",
    },
    {
      invariantKind: "departure",
      statement: "Logging goes to the debug logger where that library is loaded.",
    },
    {
      invariantKind: "departure",
      statement: "The scheduler counters are seeded from the game frame clock.",
    },
  ],
} as const satisfies Module
