import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionQuestData = {
  id: "01a06121-f0ce-7862-9eb6-795c99701a24",
  type: "page-type/module",
  slug: "companion-quest-data",
  definition:
    "every companion quest, in the order a player takes it, with the rapport each one needs",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A quest is named by the number the game knows that quest by.",
    },
  ],
} as const satisfies Module
