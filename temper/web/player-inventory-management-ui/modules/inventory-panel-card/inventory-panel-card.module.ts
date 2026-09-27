import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryPanelCard = {
  id: "01a0636c-5d9b-7555-97b9-46b09735001c",
  type: "page-type/module",
  slug: "inventory-panel-card",
  definition: "the card where every inventory panel is drawn",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The Total row's name is a web phrase page.",
    },
  ],
} as const satisfies Module
