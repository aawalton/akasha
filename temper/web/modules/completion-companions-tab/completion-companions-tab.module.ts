import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const completionCompanionsTab = {
  id: "01a06421-f74b-7e15-a4f9-2699e4940023",
  type: "page-type/module",
  slug: "completion-companions-tab",
  definition: "the completion page's companions tab, its toolbar and its cards",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
  ],
  createdAt: "2026-09-02T21:59:02.731Z",
  updatedAt: "2026-09-27T12:07:12.000Z",
} as const satisfies Module
