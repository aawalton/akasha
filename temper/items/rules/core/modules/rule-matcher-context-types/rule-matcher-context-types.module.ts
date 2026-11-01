import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const ruleMatcherContextTypes = {
  id: "01a06100-3bfb-733c-9d6f-e271da93d557",
  type: "page-type/module",
  slug: "rule-matcher-context-types",
  definition: "everything a matcher is given to read about the account before judging an item",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A matcher reads the account through this context alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reader absent from the context leaves the matching condition unjudged.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Known motif chapters are read by motif number from the lore books alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A character's target builds are its target build first, then the rest in order.",
    },
  ],
  createdAt: "2026-09-02T07:23:20.443Z",
  updatedAt: "2026-11-01T19:01:52.055Z",
} as const satisfies Module
