import type { Module } from "@akasha/code-system/module"

export const slashCommanderDisplayText = {
  id: "01a06066-8403-7b7f-9cb8-3e4ef1a60407",
  pageTypeSlug: "module",
  slug: "slash-commander-display-text",
  definition: "the labels kept out of what the game's match scorer answers",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A match that is no string is dropped.",
    },
    {
      invariantKind: "departure",
      statement: "An empty string is dropped.",
    },
    {
      invariantKind: "departure",
      statement: "The order the scorer answered in is kept.",
    },
  ],
} as const satisfies Module
