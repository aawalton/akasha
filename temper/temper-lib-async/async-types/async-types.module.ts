import type { Module } from "@akasha/code-system/module"

export const asyncTypes = {
  id: "01a0606a-1c59-7292-9a3b-f5ad9a837532",
  pageTypeSlug: "module",
  slug: "async-types",
  definition: "the shapes a task, the task class and the library table take",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A task carries a callstack rather than a Lua coroutine.",
    },
    {
      invariantKind: "departure",
      statement: "Every method on a task answers the task so calls chain.",
    },
  ],
} as const satisfies Module
