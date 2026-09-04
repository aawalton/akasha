import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const ruleMatcherContextCanLevelMorphs = {
  id: "01a06281-4830-7235-b19b-27df1e1b1b92",
  pageTypeSlug: "module",
  slug: "rule-matcher-context-can-level-morphs",
  definition: "which characters still have a skill morph left to level",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A character whose completion is unreadable can level no morph.",
    },
  ],
} as const satisfies Module
