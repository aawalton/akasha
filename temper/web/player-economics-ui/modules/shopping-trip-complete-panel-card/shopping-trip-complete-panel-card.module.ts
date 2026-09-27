import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const shoppingTripCompletePanelCard = {
  id: "01a063a1-8cc1-700f-92dd-8edc8ab7c45f",
  type: "page-type/module",
  slug: "shopping-trip-complete-panel-card",
  definition: "what a finished shopping trip cost",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each count of items and stops the card says has a phrase page of its own.",
    },
  ],
} as const satisfies Module
