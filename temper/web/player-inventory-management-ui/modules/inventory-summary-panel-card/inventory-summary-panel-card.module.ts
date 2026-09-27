import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventorySummaryPanelCard = {
  id: "01a0636c-5d9b-7459-b358-3da50484002d",
  type: "page-type/module",
  slug: "inventory-summary-panel-card",
  definition: "the card summing an inventory across its item types",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The Summary title and the Currencies row are web phrase pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A category row is named by its item category tree page.",
    },
  ],
} as const satisfies Module
