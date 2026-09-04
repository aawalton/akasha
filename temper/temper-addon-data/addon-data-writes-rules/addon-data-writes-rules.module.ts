import type { Module } from "@akasha/code-system/module"

export const addonDataWritesRules = {
  id: "01a06837-d6c9-7e56-9671-72f53be73b25",
  pageTypeSlug: "module",
  slug: "addon-data-writes-rules",
  definition: "the rules section of a run's output, as the writes the section stands for",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The rule tables are read by the engine the web runs rather than by an addon.",
    },
    {
      invariantKind: "departure",
      statement: "A section states its writes rather than performing them.",
    },
  ],
} as const satisfies Module
