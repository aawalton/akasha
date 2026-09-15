import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersEntry = {
  id: "01a0632d-cc5a-7037-a4bb-7d5cd7da43f5",
  type: "page-type/module",
  slug: "characters-entry",
  definition: "what this add-on does as the game loads it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The whole read of the game waits three seconds after the player is active.",
    },
  ],
} as const satisfies Module
