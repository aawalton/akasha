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
    {
      decisionKind: "decision-kind/departure",
      statement: "The quests are read from the companion pages rather than written here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A server, a browser and a test hold them as they hold the companion catalogue.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An add-on reads them from the companion pages as it compiles.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A companion is named by what it is called for short.",
    },
  ],
} as const satisfies Module
