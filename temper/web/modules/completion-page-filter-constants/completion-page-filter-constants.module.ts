import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const completionPageFilterConstants = {
  id: "01a06421-f74b-7781-8fbc-50d8d5c90026",
  type: "page-type/module",
  slug: "completion-page-filter-constants",
  definition: "the tabs, statuses, skill types and sort options the completion page admits",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Status and sort names are web phrase pages; skill type names are the skill type pages'.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An activity category filter is named by the keyed title its page holds.",
    },
  ],
  createdAt: "2026-09-02T21:59:02.731Z",
  updatedAt: "2026-09-27T12:19:11.000Z",
} as const satisfies Module
