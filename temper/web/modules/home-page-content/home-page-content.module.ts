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
  ],
} as const satisfies Module
