import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersTabFilters = {
  id: "01a06421-f74b-7aea-a387-9c360b500018",
  type: "page-type/module",
  slug: "characters-tab-filters",
  definition: "the search, filter and sort controls above the characters tab's cards",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
  ],
  createdAt: "2026-09-02T21:59:02.731Z",
  updatedAt: "2026-09-27T11:38:13.000Z",
} as const satisfies Module
