import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryManagementPlanBuy = {
  id: "01a06289-2676-71eb-b326-afa48bd70c7a",
  type: "page-type/module",
  slug: "inventory-management-plan-buy",
  definition:
    "what a stocking rule buying its shortfall is short of, put into the plan as an errand",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Buying is planned against a character that is no character.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A rule is short of its chain's target for the characters its by-priority leg takes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "What a rule holds is what it takes on every character, in the bank and in house storage.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule holding its target adds no errand.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule naming item ids is planned as buying the first of them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule naming no item ids is planned as buying the first item it takes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The buy note and the buying character's name are plan phrase pages.",
    },
  ],
} as const satisfies Module
