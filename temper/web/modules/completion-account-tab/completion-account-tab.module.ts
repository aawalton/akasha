import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const completionAccountTab = {
  id: "01a06421-f74b-7a4c-b82f-b33ca8d80021",
  type: "page-type/module",
  slug: "completion-account-tab",
  definition: "the completion page's account tab, its toolbar and its cards",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
  ],
  createdAt: "2026-09-02T21:59:02.731Z",
  updatedAt: "2026-09-27T11:51:46.000Z",
} as const satisfies Module
