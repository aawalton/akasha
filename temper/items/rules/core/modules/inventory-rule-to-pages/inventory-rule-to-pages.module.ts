import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryRuleToPages = {
  id: "01a072b6-0546-7d78-8e19-d3cb86901c69",
  type: "page-type/module",
  slug: "inventory-rule-to-pages",
  definition: "a rule a player has written out as a page and the entries beside it",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule's page is slugged `rule-` and the id the rule has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Where a rule falls among the rules is written as its display order.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Rules written together take display orders counted from nought in their order.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Two rules of one account with one display order are refused, and neither is written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule stating both a destination and a chain of destinations is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A condition value is written as JSON except where the value is text no JSON reader would take.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule is required to say whether the rule is switched on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An action, a goal and a category are written by the page type and slug naming each.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A condition field is written by the page type and slug naming the field.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A leg's character test is written one test to a record, naming its field and skill lines as pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A field or a skill line that names no page is refused by the write of the page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A rule saying nothing about when the rule changed is dated when the rule is written.",
    },
  ],
} as const satisfies Module
