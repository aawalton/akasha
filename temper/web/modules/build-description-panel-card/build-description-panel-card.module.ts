import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const buildDescriptionPanelCard = {
  id: "01a0642c-5b76-7e7f-9cd2-7ae443a01535",
  type: "page-type/module",
  slug: "build-description-panel-card",
  definition: "a panel card with a build's description",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
  ],
  createdAt: "2026-09-02T22:10:23.734Z",
  updatedAt: "2026-09-27T11:46:08.000Z",
} as const satisfies Module
