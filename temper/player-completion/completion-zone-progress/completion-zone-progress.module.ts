import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const completionZoneProgress = {
  id: "01a06358-4f7c-7012-8bf4-9a1715664de9",
  pageTypeSlug: "module",
  slug: "completion-zone-progress",
  definition: "how much of a zone a character has completed, completion type by completion type",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The zone catalog arrives as an argument rather than as an imported table.",
    },
    {
      invariantKind: "departure",
      statement: "A zone's activities arrive flat rather than nested.",
    },
    {
      invariantKind: "departure",
      statement: "Every activity names the completion type the activity falls under.",
    },
    {
      invariantKind: "departure",
      statement: "Completion types come out in the order of the first activity under each type.",
    },
    {
      invariantKind: "departure",
      statement: "The label of a completion type is taken from that type's first activity.",
    },
    {
      invariantKind: "constraint",
      statement: "A character read only for roster fields is skipped.",
    },
    {
      invariantKind: "constraint",
      statement: "An empty catalog answers an empty list.",
    },
  ],
} as const satisfies Module
