import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const homePageContent = {
  id: "01a06432-b190-7dc2-b7a7-6743566741f2",
  type: "page-type/module",
  slug: "home-page-content",
  definition: "the home page, showing the newest characters and companions",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The newest builds are decoded again whenever a catalogue they are decoded against is read again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Content that fails to load is worded by the Temper query error boundary.",
    },
  ],
  createdAt: "2026-09-02T22:17:18.992Z",
  updatedAt: "2026-09-27T12:55:59.000Z",
} as const satisfies Module
