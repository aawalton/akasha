import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const shoppingRouteOverviewPanelCard = {
  id: "01a063a1-8cc1-700d-9e23-345e6ca75a62",
  type: "page-type/module",
  slug: "shopping-route-overview-panel-card",
  definition: "a whole shopping route, place by place",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The card's wording is read from phrase pages rather than written in its code.",
    },
  ],
} as const satisfies Module
