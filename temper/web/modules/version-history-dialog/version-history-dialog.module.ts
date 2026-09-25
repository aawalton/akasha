import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const versionHistoryDialog = {
  id: "01a06589-8dce-7000-981b-4f4f858e4470",
  type: "page-type/module",
  slug: "version-history-dialog",
  definition: "the dialog listing a build's earlier versions",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A checkpoint names its account by the address of the account page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A checkpoint is titled by the name it is saved under.",
    },
  ],
} as const satisfies Module
