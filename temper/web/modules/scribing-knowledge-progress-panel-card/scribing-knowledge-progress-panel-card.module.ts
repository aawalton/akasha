import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scribingKnowledgeProgressPanelCard = {
  id: "01a06421-f74b-7be5-866c-bec290c60034",
  type: "page-type/module",
  slug: "scribing-knowledge-progress-panel-card",
  definition: "the scribing scripts each selected character has learned",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
  ],
  createdAt: "2026-09-02T21:59:02.731Z",
  updatedAt: "2026-09-27T11:33:40.000Z",
} as const satisfies Module
