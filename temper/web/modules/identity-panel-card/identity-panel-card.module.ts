import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const identityPanelCard = {
  id: "01a0642c-5b7d-7a4d-9299-ce0bc5a675d3",
  type: "page-type/module",
  slug: "identity-panel-card",
  definition: "a panel card with a character's identity",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
  ],
  createdAt: "2026-09-02T22:10:23.741Z",
  updatedAt: "2026-09-27T11:33:17.000Z",
} as const satisfies Module
