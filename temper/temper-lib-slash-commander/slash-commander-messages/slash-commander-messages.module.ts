import type { Module } from "@akasha/code-system/module"

export const slashCommanderMessages = {
  id: "01a06066-8403-7611-aa81-51c10a7f7f77",
  pageTypeSlug: "module",
  slug: "slash-commander-messages",
  definition: "what a misuse of the library is said to be, and the color of each command kind",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A message is English and is not translated.",
    },
    {
      invariantKind: "departure",
      statement: "A kind is numbered rather than named.",
    },
    {
      invariantKind: "departure",
      statement: "A kind holds a color of its own.",
    },
    {
      invariantKind: "departure",
      statement: "A color is written as the game's own inline color markup.",
    },
  ],
} as const satisfies Module
