import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const characterClass = {
  id: "01a06076-1b68-7f3a-8237-8beb701e2f8f",
  type: "page-type/module",
  slug: "character-class",
  definition: "every character class the game offers, with its icon and its game id",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The classes are read from the class pages and held with the skill catalogue.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A class's place in this table is the index a build hash has.",
    },
  ],
} as const satisfies Module
