import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryRuleSettingsShape = {
  id: "01a068e2-226a-7523-928d-85398937e67c",
  type: "page-type/module",
  slug: "inventory-rule-settings-shape",
  definition: "what unknown JSON holds to be taken as a player's inventory rule settings",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Settings arrive as JSON nobody has vouched for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only version two is read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule is required to have an id and an action and nothing more.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Settings written by a newer temper are still read by an older temper.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "Every action name is written out again here.",
    },
  ],
} as const satisfies Module
