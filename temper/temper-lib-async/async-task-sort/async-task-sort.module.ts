import type { Module } from "@akasha/code-system/module"

export const asyncTaskSort = {
  id: "01a0606a-1c59-7223-ad74-aecf370c93d5",
  pageTypeSlug: "module",
  slug: "async-task-sort",
  definition: "a quicksort broken into steps a task runs across frames",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A partition runs as its own step.",
    },
    {
      invariantKind: "departure",
      statement: "The smaller side is sorted before the larger side.",
    },
    {
      invariantKind: "departure",
      statement: "A comparison that never settles raises an error.",
    },
  ],
} as const satisfies Module
