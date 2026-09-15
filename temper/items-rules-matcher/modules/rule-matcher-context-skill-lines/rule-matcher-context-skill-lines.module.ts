import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const ruleMatcherContextSkillLines = {
  id: "01a06151-370e-7c6e-8369-9aab90a53fd0",
  type: "module",
  slug: "rule-matcher-context-skill-lines",
  definition: "each character's skill line ranks, compiled into a reader the matcher calls",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A character the game gave no progress for is kept out.",
    },
    {
      invariantKind: "departure",
      statement: "Only a rank the game gave as a number is kept.",
    },
    {
      invariantKind: "departure",
      statement: "A line the character has opened but not advanced answers rank zero.",
    },
    {
      invariantKind: "departure",
      statement: "A skill line the character has not opened answers as nothing.",
    },
  ],
} as const satisfies Module
