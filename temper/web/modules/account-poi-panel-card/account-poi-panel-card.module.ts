import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const accountPoiPanelCard = {
  id: "01a06421-f74b-7d3d-b6f9-7d6db3070005",
  type: "page-type/module",
  slug: "account-poi-panel-card",
  definition: "the points of interest any character on the account has discovered, by zone",
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
