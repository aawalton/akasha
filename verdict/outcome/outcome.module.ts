import type { Module } from "@akasha/code-system/module"

export const outcome = {
  id: "01a05cb3-7cca-7b0c-8c00-19c93b299d81",
  pageTypeSlug: "module",
  slug: "outcome",
  definition: "what one check judged and what it found, drawn as a line and a body",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A check finding nothing passes.",
    },
    {
      invariantKind: "departure",
      statement: "A check with nothing to judge answers not-applicable rather than passing.",
    },
    {
      invariantKind: "departure",
      statement: "An advisory carries what the check found without refusing the change.",
    },
    {
      invariantKind: "departure",
      statement: "How much was looked at is carried beside what was found.",
    },
  ],
} as const satisfies Module
