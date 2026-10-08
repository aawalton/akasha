import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const watcherUploadRetry = {
  id: "01a0633f-8d1e-708b-a8d1-f73b5552b672",
  type: "page-type/module",
  slug: "watcher-upload-retry",
  definition: "how an upload the server broke off is tried again",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a statement timeout or a gateway failure is tried again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Anything else thrown reaches the caller on the first attempt.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The ceiling on the delay doubles with each attempt.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The ceiling on the delay never rises above the longest delay allowed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A delay is drawn at random from below its ceiling.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The final attempt throws rather than delaying again.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here names the upload's contents.",
    },
  ],
  createdAt: "2026-09-02T17:51:44.414Z",
  updatedAt: "2026-09-15T18:43:51.000Z",
} as const satisfies Module
