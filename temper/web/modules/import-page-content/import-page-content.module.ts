import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const importPageContent = {
  id: "01a06432-b190-7662-99a5-aa1be920f7df",
  type: "page-type/module",
  slug: "import-page-content",
  definition: "the page taking a saved variables file and showing its outcome",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A name in braces in a phrase is filled with a drawn piece, such as a link or a path.",
    },
  ],
  createdAt: "2026-09-02T22:17:18.992Z",
  updatedAt: "2026-09-27T11:37:40.000Z",
} as const satisfies Module
