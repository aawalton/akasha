import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const versionHistoryItem = {
  id: "01a0e2a7-8c5a-76d7-b5c2-fe9707898acc",
  type: "page-type/module",
  slug: "version-history-item",
  definition: "one saved version of a build in the version history dialog, with its restore button",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
  ],
} as const satisfies Module
