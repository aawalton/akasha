import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const completionPanelCard = {
  id: "01a06267-372c-7002-bf32-c613086380b1",
  pageTypeSlug: "module",
  slug: "completion-panel-card",
  definition: "a card telling how far along each branch of a completion tree is",
  code: "tsx",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A row counting nothing is drawn nowhere.",
    },
    {
      invariantKind: "constraint",
      statement: "A branch is drawn where any row beneath the branch is drawn.",
    },
    {
      invariantKind: "constraint",
      statement: "A search of fewer than three letters narrows nothing.",
    },
  ],
} as const satisfies Module
