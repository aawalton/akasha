import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const ruleCardFilterChipRequiredSkillLines = {
  id: "01a0636c-5da1-7ac2-b363-c0f033ef004c",
  type: "page-type/module",
  slug: "rule-card-filter-chip-required-skill-lines",
  definition: "the chip narrowing a rule by the skill lines an item needs",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The chip's remove label is the remove-filter phrase.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The modes are condition value pages, and the chip's other words are rule card phrases.",
    },
  ],
} as const satisfies Module
