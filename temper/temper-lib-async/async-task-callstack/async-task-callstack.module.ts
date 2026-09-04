import type { Module } from "@akasha/code-system/module"

export const asyncTaskCallstack = {
  id: "01a0606a-1c58-7824-9a32-89e327147359",
  pageTypeSlug: "module",
  slug: "async-task-callstack",
  definition: "how a step is put onto a task's callstack",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A step called runs before the steps already waiting.",
    },
    {
      invariantKind: "departure",
      statement: "A step chained runs after the steps already waiting.",
    },
    {
      invariantKind: "departure",
      statement: "A step added to the running task goes in beside the step now running.",
    },
  ],
} as const satisfies Module
