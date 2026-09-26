import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const ruleTemplateCatalog = {
  id: "01a0df76-d856-777c-9a4d-6f4ae23909ec",
  type: "page-type/module",
  slug: "rule-template-catalog",
  definition: "the rule templates read from their pages as the rules a player starts from",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The starting rules are the rule templates and nothing besides.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A template's place among the rules comes from the display order its page states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A template's conditions are the rows beside its page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A template's rule is named by the template's key.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One reading is held at a time, and a new reading replaces it whole.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Asking for the templates before they are read is refused rather than answered empty.",
    },
  ],
} as const satisfies Module
