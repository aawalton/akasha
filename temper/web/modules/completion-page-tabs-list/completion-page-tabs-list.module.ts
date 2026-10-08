import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const completionPageTabsList = {
  id: "01a0e2c2-fbb4-7262-9190-45a1184fde38",
  type: "page-type/module",
  slug: "completion-page-tabs-list",
  definition: "the list of tabs the completion page draws",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A tab showing one completion category is named by that category's page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The summary tab is named by a web phrase page.",
    },
  ],
  createdAt: "2026-09-27T12:07:04.372Z",
  updatedAt: "2026-09-27T12:07:12.000Z",
} as const satisfies Module
