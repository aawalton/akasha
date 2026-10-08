import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const methodologyPageContent = {
  id: "01a06432-b190-7b04-9ea4-ac15438bbcac",
  type: "page-type/module",
  slug: "methodology-page-content",
  definition: "the methodology page and its tabs",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
  ],
  createdAt: "2026-09-02T22:17:18.992Z",
  updatedAt: "2026-09-27T11:31:25.000Z",
} as const satisfies Module
