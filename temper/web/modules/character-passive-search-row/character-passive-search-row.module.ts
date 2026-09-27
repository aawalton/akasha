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
} as const satisfies Module
