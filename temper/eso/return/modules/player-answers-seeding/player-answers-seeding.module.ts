import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const playerAnswersSeeding = {
  id: "01a0d597-ba4e-7a70-9a6d-3d86c5f10fb5",
  type: "page-type/module",
  slug: "player-answers-seeding",
  definition: "the Lua giving back in a sandbox what the player's own game answered a function",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The answers are read from the catalog add-on's saved file on this machine.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only the answers' own table is taken out of that file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The answers are read from the first account holding them, by sorted name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A function asked with values the player's game answered gives back those answers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Asked any other way, it gives back what it gave before.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The saved table is cleared once its answers are set.",
    },
  ],
} as const satisfies Module
