import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const completionSavedVariables = {
  id: "01a06253-d28f-7005-961f-2e9ac1ad2770",
  type: "page-type/module",
  slug: "completion-saved-variables",
  definition: "the completion addon's saved table and the migrations onto it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The build each character is set up as is saved by the character's id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A saved choice names the target build it was chosen over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A build changed in the game is saved as pending until the game reads it landed.",
    },
  ],
  createdAt: "2026-09-02T13:34:15.695Z",
  updatedAt: "2026-11-01T20:32:56.237Z",
} as const satisfies Module
