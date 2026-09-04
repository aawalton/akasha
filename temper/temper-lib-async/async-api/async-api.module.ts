import type { Module } from "@akasha/code-system/module"

export const asyncApi = {
  id: "01a0606a-1c53-7ea1-a0eb-d07680c9af9f",
  pageTypeSlug: "module",
  slug: "async-api",
  definition: "the functions the library hands to every other addon",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A caller with no task of its own runs on the default task.",
    },
    {
      invariantKind: "departure",
      statement: "The default task cannot be cancelled.",
    },
    {
      invariantKind: "departure",
      statement: "The default task takes no finally step and no error step.",
    },
    {
      invariantKind: "departure",
      statement: "A stall threshold set by slash command is bounded at both ends.",
    },
  ],
} as const satisfies Module
