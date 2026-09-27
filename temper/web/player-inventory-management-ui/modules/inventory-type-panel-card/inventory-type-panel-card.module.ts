import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryTypePanelCard = {
  id: "01a0636c-5d9b-7777-87e1-6841b082002f",
  type: "page-type/module",
  slug: "inventory-type-panel-card",
  definition: "the card drawing a kind of item's holdings",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Companion trait names are drawn again whenever the companion catalogue is read again.",
    },
  ],
} as const satisfies Module
