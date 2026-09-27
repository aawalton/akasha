import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const accountFilters = {
  id: "01a06421-f74a-78a9-bc07-f80c0dfb0003",
  type: "page-type/module",
  slug: "account-filters",
  definition: "the filters the account tab offers, and which ids name one",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each filter names the web phrase page its label is read from.",
    },
  ],
} as const satisfies Module
