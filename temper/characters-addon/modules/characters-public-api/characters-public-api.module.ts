import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersPublicApi = {
  id: "01a06324-9ff8-7061-9aeb-8aa8acce0372",
  type: "module",
  slug: "characters-public-api",
  definition: "the table this add-on publishes for other add-ons and for the keybindings",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A name this table publishes keeps the spelling its readers use.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The table is assigned through a cast rather than a declaration.",
    },
  ],
} as const satisfies Module
