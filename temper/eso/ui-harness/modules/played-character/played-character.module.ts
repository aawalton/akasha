import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const playedCharacter = {
  id: "01a15503-38bd-7483-b0ca-ee74b59a0751",
  type: "page-type/module",
  slug: "played-character",
  definition: "the character of the player's account that the sandbox is played as",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A character is named by its page's slug, its title or the game's id for it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A character is read from the account character pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Playing as a character changes the player's character id and the player's name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every other answer stays what the player's own game answered.",
    },
  ],
  createdAt: "2026-10-19T16:33:56.923Z",
  updatedAt: "2026-10-19T16:33:56.923Z",
} as const satisfies Module
