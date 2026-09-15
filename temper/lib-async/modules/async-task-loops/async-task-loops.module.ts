import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const asyncTaskLoops = {
  id: "01a0606a-1c58-7114-8732-db616cf0b69c",
  type: "page-type/module",
  slug: "async-task-loops",
  definition:
    "the numeric loop, the pairs loop and the conditional loop a task runs a step at a time",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A loop is declared by a marker step the body step then replaces.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body without a preceding loop declaration raises an error.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A loop stops early where the body answers the break value.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A numeric loop with a zero step raises an error.",
    },
  ],
} as const satisfies Module
