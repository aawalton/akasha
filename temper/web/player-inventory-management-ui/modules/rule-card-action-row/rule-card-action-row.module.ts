import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const ruleCardActionRow = {
  id: "01a0636c-5d9b-7ced-ac2b-1712d9b2003d",
  type: "page-type/module",
  slug: "rule-card-action-row",
  definition: "the row where a rule's action is chosen",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Action, sell destination and bank labels are read from item action and venue pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The destination toggle is worded by rule card phrases.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The destination toggle's aria-label is a rule card phrase.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The mail recipient's placeholder and aria-label are rule card phrases.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stocking rule's buy shortfall toggle and its aria-label are rule card phrases.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule buying its shortfall shows the most it pays for one beside that toggle.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A price of zero reads as the price paid where the rule states none.",
    },
  ],
} as const satisfies Module
