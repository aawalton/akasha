import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const useRuleTemplates = {
  id: "01a0df76-d857-7955-ace5-308c1d68c035",
  type: "page-type/module",
  slug: "use-rule-templates",
  definition: "the rule templates a screen reads from their pages",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A screen reads the rule template pages only where it shows something they decide.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule template page changing while a screen is open reaches it with no refresh.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A read that fails is thrown to the screen rather than shown as no templates.",
    },
  ],
} as const satisfies Module
