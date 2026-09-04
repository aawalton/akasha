import type { Module } from "@akasha/code-system/module"

export const tradingSavedSearchStore = {
  id: "01a06160-2a5c-7345-a7bf-ba9b15501951",
  pageTypeSlug: "module",
  slug: "trading-saved-search-store",
  definition: "the searches a player named and keeps, and which of them is active",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Renaming a search leaves its place in the list.",
    },
  ],
} as const satisfies Module
