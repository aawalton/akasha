import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionsFilterBar = {
  id: "01a0641f-8bef-7567-be70-80b3096ce27e",
  type: "page-type/module",
  slug: "companions-filter-bar",
  definition: "the bar filtering and sorting a companion list",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The roles offered are the companion base role pages, by their titles.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
  ],
} as const satisfies Module
