import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const levelFilter = {
  id: "01a06100-3bf2-7955-aa20-b395eca80d9f",
  type: "module",
  slug: "level-filter",
  definition: "the Level condition a rule may carry, as the rule editor offers it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This filter reads and writes the conditions `levelOp` and `maxLevel`.",
    },
    {
      invariantKind: "departure",
      statement: "A category outside `equipment` is offered no Level condition.",
    },
  ],
} as const satisfies Module
