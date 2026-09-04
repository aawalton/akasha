import type { Module } from "@akasha/code-system/module"

export const asyncTaskClass = {
  id: "01a0606a-1c58-7ece-b623-19549164bc35",
  pageTypeSlug: "module",
  slug: "async-task-class",
  definition: "a task and the making, resuming, suspending and cancelling of that task",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A task resumed is put on the job list.",
    },
    {
      invariantKind: "departure",
      statement: "A task suspended is taken off the job list.",
    },
    {
      invariantKind: "departure",
      statement: "A task cancelled keeps a place on the job list while a finally step is set.",
    },
  ],
} as const satisfies Module
