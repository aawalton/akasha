import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const ruleCardFilterChipsAbility = {
  id: "01a0636c-5da1-7636-aa1b-e8a983c7004e",
  type: "page-type/module",
  slug: "rule-card-filter-chips-ability",
  definition: "the chip narrowing a rule by the ability an item has",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A chip naming its filter shows its condition field page's title.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "The reason a locked chip gives still names its filter in the code's own words.",
    },
  ],
} as const satisfies Module
