import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const watcherCharacterReadings = {
  id: "01a15585-c31e-7d9a-bd1a-9e0eee21e0da",
  type: "page-type/module",
  slug: "watcher-character-readings",
  definition: "the toughness, damage and healing each of an account's characters reads at",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A character is read from the completion landed beside its page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The characters read are the ones naming the account page's address.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading is keyed by the game's character id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading is each value rounded to a whole number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A character whose reading refuses or throws has no reading, and the log says why.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes a file.",
    },
  ],
  createdAt: "2026-10-19T18:56:32.030Z",
  updatedAt: "2026-10-19T18:56:32.030Z",
} as const satisfies Module
