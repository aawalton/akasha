import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const armorPanelCard = {
  id: "01a0642d-9a17-7544-8ead-6c25afebc88f",
  type: "page-type/module",
  slug: "armor-panel-card",
  definition: "the seven armor slots of a build, with the bulk edits that reach them all",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The slots are drawn again whenever the gear tables are read again.",
    },
  ],
} as const satisfies Module
