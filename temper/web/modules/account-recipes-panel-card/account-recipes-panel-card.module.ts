import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const accountRecipesPanelCard = {
  id: "01a06421-f74b-74eb-87e9-e619720b0008",
  type: "page-type/module",
  slug: "account-recipes-panel-card",
  definition: "the crafting recipes any character on the account knows",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its title is read from its completion category page.",
    },
  ],
  createdAt: "2026-09-02T21:59:02.731Z",
  updatedAt: "2026-09-27T11:31:19.000Z",
} as const satisfies Module
