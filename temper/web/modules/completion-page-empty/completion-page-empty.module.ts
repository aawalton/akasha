import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const completionPageEmpty = {
  id: "01a06421-f74b-7ac7-8c70-c606e0640025",
  type: "page-type/module",
  slug: "completion-page-empty",
  definition: "what the completion page draws for an account with no completion data",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
  ],
  createdAt: "2026-09-02T21:59:02.731Z",
  updatedAt: "2026-09-27T11:26:25.000Z",
} as const satisfies Module
