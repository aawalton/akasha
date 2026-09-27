import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const recentCharactersCard = {
  id: "01a06432-b190-77de-b968-e4a3f00bdac1",
  type: "page-type/module",
  slug: "recent-characters-card",
  definition: "the card listing the character builds touched most recently",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
  ],
} as const satisfies Module
