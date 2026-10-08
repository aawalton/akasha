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
    {
      decisionKind: "decision-kind/departure",
      statement: "A suggestion's kind and change are worded here from what the generator states.",
    },
  ],
  createdAt: "2026-09-02T21:58:08.930Z",
  updatedAt: "2026-09-27T12:33:00.000Z",
} as const satisfies Module
