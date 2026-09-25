import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const ruleTemplatePages = {
  id: "01a0d895-8074-7bc8-a3e1-e30c831a95de",
  type: "page-type/module",
  slug: "rule-template-pages",
  definition: "every rule template page, in the order of its display order",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The pages are imported rather than read, so a browser holds them as well.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A template's place in the order comes from the display order its page states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A template's conditions are the text of the entry file beside its page.",
    },
  ],
} as const satisfies Module
