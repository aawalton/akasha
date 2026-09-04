import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const ruleMatcherContextSkillLines = {
  id: "01a06151-370e-7c6e-8369-9aab90a53fd0",
  pageTypeSlug: "module",
  slug: "rule-matcher-context-skill-lines",
  definition: "each character's skill line ranks, compiled into a reader the matcher calls",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A skill line the character has not opened answers as nothing.",
    },
  ],
} as const satisfies Module
