import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const watcherPageContent = {
  id: "01a06432-b190-7bc3-ae2c-af4ceb23dbed",
  type: "page-type/module",
  slug: "watcher-page-content",
  definition: "the page telling what the watcher is doing, built from its three status cards",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A name in braces in a phrase is filled with the styled piece the screen draws there.",
    },
  ],
} as const satisfies Module
