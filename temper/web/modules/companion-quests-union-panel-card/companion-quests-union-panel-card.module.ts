import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionQuestsUnionPanelCard = {
  id: "01a06421-f74b-7675-b6fd-69c40e07001d",
  type: "page-type/module",
  slug: "companion-quests-union-panel-card",
  definition: "the companion quests any character on the account has finished",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its title is its completion category page's.",
    },
  ],
} as const satisfies Module
