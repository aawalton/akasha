import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const completionCatalogs = {
  id: "01a0640a-3feb-7271-b1ef-b87cc58a603c",
  pageTypeSlug: "module",
  slug: "completion-catalogs",
  definition: "the game's reference tables a completion reckoning reads, gathered as one",
  code: "ts",
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing here runs.",
    },
    {
      invariantKind: "departure",
      statement: "One bundle carries every catalog the completion transforms read.",
    },
    {
      invariantKind: "departure",
      statement: "A catalog is named for what the catalog holds rather than for its reader.",
    },
    {
      invariantKind: "departure",
      statement: "A reader that has asked for no catalog yet holds the empty bundle.",
    },
  ],
} as const satisfies Module
