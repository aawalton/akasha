import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const ruleCardFilterChipsItemFlags = {
  id: "01a0636c-5da1-76b9-81c0-129f6af8004f",
  type: "page-type/module",
  slug: "rule-card-filter-chips-item-flags",
  definition: "the chips narrowing a rule by the flags an item has",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A chip's options are its condition field's value pages, and none is drawn before.",
    },
  ],
} as const satisfies Module
