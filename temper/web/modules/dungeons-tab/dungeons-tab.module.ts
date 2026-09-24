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
  ],
} as const satisfies Module
