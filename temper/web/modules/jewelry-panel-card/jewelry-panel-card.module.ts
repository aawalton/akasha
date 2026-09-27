import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const jewelryPanelCard = {
  id: "01a0642d-9a17-7e93-9404-efd12df3f8b9",
  type: "page-type/module",
  slug: "jewelry-panel-card",
  definition: "the three jewelry slots of a build, with the bulk edits that reach them all",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The slots are drawn again whenever the gear tables are read again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Its title is the jewelry source category's title, read from that page.",
    },
  ],
} as const satisfies Module
