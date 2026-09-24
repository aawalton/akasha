import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const dungeonChampionSavedVars = {
  id: "01a060f9-bad8-7db9-82ae-dfa276bad382",
  type: "page-type/module",
  slug: "dungeon-champion-saved-vars",
  definition: "the settings this addon keeps between sessions",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Settings once kept under a character name are moved to the account id once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Reading the settings before the settings are brought up throws.",
    },
  ],
} as const satisfies Module
