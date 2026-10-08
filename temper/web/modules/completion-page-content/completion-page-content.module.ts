import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const completionPageContent = {
  id: "01a06421-f74b-752c-aa6e-fc3008690024",
  type: "page-type/module",
  slug: "completion-page-content",
  definition: "the completion page's tabs and what each tab is handed to draw",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Activity category names are read from the activity category pages.",
    },
  ],
  createdAt: "2026-09-02T21:59:02.731Z",
  updatedAt: "2026-09-27T12:19:11.000Z",
} as const satisfies Module
