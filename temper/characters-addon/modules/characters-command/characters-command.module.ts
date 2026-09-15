import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const charactersCommand = {
  id: "01a0632d-cacd-700b-99b3-a58078ae9a53",
  type: "module",
  slug: "characters-command",
  definition: "the slash commands this add-on answers to",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A reset empties the saved table before reading the game again.",
    },
  ],
} as const satisfies Module
