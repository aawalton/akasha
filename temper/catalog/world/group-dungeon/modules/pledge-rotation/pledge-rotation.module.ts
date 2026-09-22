import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pledgeRotation = {
  id: "01a06031-70e5-7122-83f1-7221c174553d",
  type: "page-type/module",
  slug: "pledge-rotation",
  definition: "each quest giver's dungeon on an instant's day",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A rotation is counted in whole days from the giver's own epoch.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A day here is the day the game resets on rather than the calendar day.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A giver whose rotation has no dungeon at today's position is refused.",
    },
  ],
} as const satisfies Module
