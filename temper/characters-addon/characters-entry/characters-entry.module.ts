import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const charactersEntry = {
  id: "01a0632d-cc5a-7037-a4bb-7d5cd7da43f5",
  pageTypeSlug: "module",
  slug: "characters-entry",
  definition: "what this add-on does as the game loads it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The whole read of the game waits three seconds after the player is active.",
    },
  ],
} as const satisfies Module
