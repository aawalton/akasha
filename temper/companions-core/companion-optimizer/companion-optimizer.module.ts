import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const companionOptimizer = {
  id: "01a06152-c2cd-7817-8e93-a08a7fd88008",
  pageTypeSlug: "module",
  slug: "companion-optimizer",
  definition: "recursive phase search for the highest scoring companion build",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The score sums role metrics with tank and support toughness divided by ten.",
    },
    {
      invariantKind: "departure",
      statement: "The skill bar is sanitized of role-invalid skills before every evaluation.",
    },
    {
      invariantKind: "constraint",
      statement: "A build with no matching role metric evaluates to zero.",
    },
    {
      invariantKind: "gap",
      statement: "The quickened trait forces a sweep over every possible slot count.",
    },
  ],
} as const satisfies Module
