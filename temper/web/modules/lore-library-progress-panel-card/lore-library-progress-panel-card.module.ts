import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const loreLibraryProgressPanelCard = {
  id: "01a06421-f74b-7ea3-9eba-17ba7992002d",
  type: "page-type/module",
  slug: "lore-library-progress-panel-card",
  definition: "the lore books each selected character has collected",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The card's title is read from the character lore library's completion category page.",
    },
  ],
  code: "tsx",
  createdAt: "2026-09-02T21:59:02.731Z",
  updatedAt: "2026-09-27T11:06:50.000Z",
} as const satisfies Module
