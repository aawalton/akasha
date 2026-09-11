import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const charactersTaskProgressTestUtils = {
  id: "01a08ed6-a208-7d96-96d8-75bf328401f1",
  type: "module",
  slug: "characters-task-progress-test-utils",
  definition: "the saved character entry a progress resolver's test is written against",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A capture the test leaves unnamed is absent from the entry rather than empty.",
    },
  ],
} as const satisfies Module
