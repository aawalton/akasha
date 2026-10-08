import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const otherPanelCard = {
  id: "01a0642c-5b7f-7161-af3f-465cb6ee4aeb",
  type: "page-type/module",
  slug: "other-panel-card",
  definition: "a panel card with a character's remaining sources",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The ESO Plus and no-alliance labels are the titles of those pages.",
    },
  ],
  createdAt: "2026-09-02T22:10:23.743Z",
  updatedAt: "2026-09-27T11:30:53.000Z",
} as const satisfies Module
