import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const characterManagementPanelCard = {
  id: "01a06589-8d6b-7000-a576-a0cff7027bd0",
  type: "page-type/module",
  slug: "character-management-panel-card",
  definition: "the card for keeping and removing a character",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A delete refused before it starts is worded by the kind of refusal.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A delete that fails shows no error's own text, which goes to the console.",
    },
  ],
} as const satisfies Module
