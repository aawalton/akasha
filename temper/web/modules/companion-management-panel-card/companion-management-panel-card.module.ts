import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionManagementPanelCard = {
  id: "01a06589-8d9b-7000-b064-ee892502da91",
  type: "page-type/module",
  slug: "companion-management-panel-card",
  definition: "the card for keeping and removing a companion",
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
