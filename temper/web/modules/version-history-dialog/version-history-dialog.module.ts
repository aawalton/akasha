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
    {
      decisionKind: "decision-kind/departure",
      statement: "A checkpoint is a version of the page type its own kind of build keeps.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A checkpoint names its build by the build's address.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A checkpoint saved before the account page is read waits for it, and says it is waiting.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A checkpoint whose account page never comes is refused aloud rather than dropped.",
    },
  ],
} as const satisfies Module
