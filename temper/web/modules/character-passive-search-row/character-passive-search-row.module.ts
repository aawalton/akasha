import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const characterPassiveSearchRow = {
  id: "01a0e2aa-ae30-7406-861c-b8922b51276c",
  type: "page-type/module",
  slug: "character-passive-search-row",
  definition: "the search and category filter over the passives the character editor lists",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages and the skill line category pages.",
    },
  ],
  createdAt: "2026-09-27T11:40:31.664Z",
  updatedAt: "2026-09-27T11:52:45.000Z",
} as const satisfies Module
