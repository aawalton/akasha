import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const ruleTemplatePages2 = {
  id: "01a0d895-8074-7474-a7b5-b84d64dc83a0",
  type: "page-type/module",
  slug: "rule-template-pages-2",
  definition: "a run of the rule template pages and their conditions, in their display order",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "These pages are one unbroken run of the order the whole set of rule template pages has.",
    },
  ],
} as const satisfies Module
