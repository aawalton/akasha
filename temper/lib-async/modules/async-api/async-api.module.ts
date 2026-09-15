import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const asyncApi = {
  id: "01a0606a-1c53-7ea1-a0eb-d07680c9af9f",
  type: "page-type/module",
  slug: "async-api",
  definition: "the functions the library hands to every other addon",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller with no task of its own runs on the default task.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The default task cannot be cancelled.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The default task takes no finally step and no error step.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stall threshold set by slash command is bounded at both ends.",
    },
  ],
} as const satisfies Module
