import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const pacedQueue = {
  id: "01a08dda-ba3d-7624-b2c6-d4397c9fce94",
  pageTypeSlug: "module",
  type: "module",
  slug: "paced-queue",
  definition: "runs taken one at a time, each one a stated wait after the one before it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A run waits for every run handed over before it.",
    },
    {
      invariantKind: "departure",
      statement: "A run that fails is waited out as long as a run that answers.",
    },
    {
      invariantKind: "departure",
      statement: "A queue paces the runs handed to that queue and no other runs.",
    },
    {
      invariantKind: "departure",
      statement: "A run's answer reaches its caller rather than the wait after it.",
    },
  ],
} as const satisfies Module
