import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const completionCharacterRow = {
  id: "01a06108-2fee-7a2e-b1b8-6d8bc1327536",
  type: "page-type/module",
  slug: "completion-character-row",
  definition: "a character of a player's roster as the completion store keeps it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here runs.",
    },
  ],
} as const satisfies Module
