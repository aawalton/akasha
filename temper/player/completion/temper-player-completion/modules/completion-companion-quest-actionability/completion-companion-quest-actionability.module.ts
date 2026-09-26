import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const completionCompanionQuestActionability = {
  id: "01a06121-f0d1-7a40-bb2f-7378186e50e0",
  type: "page-type/module",
  slug: "completion-companion-quest-actionability",
  definition: "the next companion quest a player can take right now",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Companions are gone through in the order of their names.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A quest asking more rapport than a companion holds is not yet takeable.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The caller hands in each companion's game id, so the addon reads it at build.",
    },
  ],
} as const satisfies Module
