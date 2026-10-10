import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const savedVarsMigration = {
  id: "01a06072-5abc-78bd-a40d-4a0c330f4651",
  type: "page-type/module",
  slug: "saved-vars-migration",
  definition: "a player's saved variables carried to the file the folded-together addon reads",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A migration names the one addon that migration runs for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rename writes the new file and leaves the old file alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rename whose new file is already there is skipped.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rename naming a global that matches nothing writes nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rename naming no global copies the old file whole.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An append copies the target aside before writing the target.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An append whose target is absent is skipped rather than made.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An append made or found made leaves a marker, and a marker present means done.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An append the game later dropped from the target is not made again.",
    },

    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here runs a whole list of migrations.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here says what a migration did.",
    },
  ],
  createdAt: "2026-09-02T04:48:22.204Z",
  updatedAt: "2026-10-10T14:36:47.007Z",
} as const satisfies Module
