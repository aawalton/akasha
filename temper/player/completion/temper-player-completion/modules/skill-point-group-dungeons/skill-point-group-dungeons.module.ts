import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const skillPointGroupDungeons = {
  id: "01a06108-2ff8-7e0f-a1bc-51a0856188bc",
  type: "page-type/module",
  slug: "skill-point-group-dungeons",
  definition: "the skill point each group dungeon hands a character for its quest",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The dungeons and their labels are read off the dungeon data rather than copied.",
    },
  ],
} as const satisfies Module
