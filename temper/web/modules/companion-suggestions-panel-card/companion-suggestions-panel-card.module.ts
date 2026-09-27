import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionSuggestionsPanelCard = {
  id: "01a06421-2522-7599-826a-399a2ca51e7d",
  type: "page-type/module",
  slug: "companion-suggestions-panel-card",
  definition: "a panel card stating what a companion could change",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
  ],
} as const satisfies Module
