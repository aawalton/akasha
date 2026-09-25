import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const itemRulePages = {
  id: "01a0d8c8-b513-71a3-a27c-702bcbf981e1",
  type: "page-type/module",
  slug: "item-rule-pages",
  definition: "an item rule a player holds, read from its page and written as one",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An item rule's page is slugged `item-rule-` and the id the rule has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Item rules written together take display orders counted from nought in their order.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Item rules are read back in display order.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An action and a goal are written by the page type and slug naming each.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An action, a goal or a stock scope no page or value names is refused, and the rule is not written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule naming no item's number or no item name is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule stating both a destination and a chain of destinations is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule the page already says is written again by nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A field a rule dropped is cleared from its page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule page no rule wants any longer is taken away.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What an item rule and a buy rule share is read and written here for both.",
    },
  ],
} as const satisfies Module
