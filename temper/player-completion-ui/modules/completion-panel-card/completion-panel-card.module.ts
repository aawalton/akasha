import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const completionPanelCard = {
  id: "01a06267-372c-7002-bf32-c613086380b1",
  type: "module",
  slug: "completion-panel-card",
  definition: "a card telling how far along each branch of a completion tree is",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A row counting nothing is drawn nowhere.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A branch is drawn where any row beneath the branch is drawn.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A search of fewer than three letters narrows nothing.",
    },
  ],
} as const satisfies Module
