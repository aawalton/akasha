import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionEntityPanelCard = {
  id: "01a0641f-8bed-714a-82bf-afee8267dfa2",
  type: "page-type/module",
  slug: "companion-entity-panel-card",
  definition: "a panel card drawing a companion in a plan",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Its roles are named by the base role names module.",
    },
  ],
} as const satisfies Module
