import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const buffOrDebuffSource = {
  id: "01a06070-82dd-75fc-a816-ccfe176b1e07",
  type: "page-type/module",
  slug: "buff-or-debuff-source",
  definition: "every buff and debuff the game names, and the effects each gives",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Buffs and debuffs are read from their Major, Minor and other buff and debuff pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Those pages are held wherever the skill catalogue or the companion catalogue is.",
    },
  ],
} as const satisfies Module
