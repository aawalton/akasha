import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const useRuleGoalTitles = {
  id: "01a0e2b7-d3d6-7fb7-9923-f191bf9febfe",
  type: "page-type/module",
  slug: "use-rule-goal-titles",
  definition: "the titles of the rule goal pages, by the goal each names",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A goal is named by its rule goal page's title, found by the page's slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Until the pages are read there are no titles rather than empty ones.",
    },
  ],
} as const satisfies Module
