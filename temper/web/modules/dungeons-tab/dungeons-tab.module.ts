import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const dungeonsTab = {
  id: "01a06432-b190-7747-916a-01f0593a3621",
  type: "page-type/module",
  slug: "dungeons-tab",
  definition: "the dungeons tab of the catalog",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The tab reads the dungeon and quest giver pages, and changes as they do.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The tab is drawn only once both the dungeon and quest giver pages are answered.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
  ],
  createdAt: "2026-09-02T22:17:18.992Z",
  updatedAt: "2026-09-27T11:35:11.000Z",
} as const satisfies Module
