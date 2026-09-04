import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const charactersPublicApi = {
  id: "01a06324-9ff8-7061-9aeb-8aa8acce0372",
  pageTypeSlug: "module",
  slug: "characters-public-api",
  definition: "the table this add-on publishes for other add-ons and for the keybindings",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A name this table publishes keeps the spelling its readers use.",
    },
    {
      invariantKind: "departure",
      statement: "The table is assigned through a cast rather than a declaration.",
    },
  ],
} as const satisfies Module
