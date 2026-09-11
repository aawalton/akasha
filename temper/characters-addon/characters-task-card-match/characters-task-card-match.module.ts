import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const charactersTaskCardMatch = {
  id: "01a062ee-efdd-7065-b808-78f99e6b809a",
  type: "module",
  slug: "characters-task-card-match",
  definition: "whether a task names a completion card, and what its item path holds at an index",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "Whether a task names a completion card is worked out in one place.",
    },
  ],
} as const satisfies Module
