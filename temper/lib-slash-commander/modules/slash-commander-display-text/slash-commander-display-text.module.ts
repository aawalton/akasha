import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const slashCommanderDisplayText = {
  id: "01a06066-8403-7b7f-9cb8-3e4ef1a60407",
  type: "page-type/module",
  slug: "slash-commander-display-text",
  definition: "the labels kept out of what the game's match scorer answers",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A match that is no string is dropped.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An empty string is dropped.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The order the scorer answered in is kept.",
    },
  ],
} as const satisfies Module
