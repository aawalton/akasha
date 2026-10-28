import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const webItemFacts = {
  id: "01a06151-370f-7640-8a17-8e63877bb9d9",
  type: "page-type/module",
  slug: "web-item-facts",
  definition: "the facts a rule reads, taken for the web build from the captured holdings",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Whether an item was crafted today is judged against the clock as the facts are taken.",
    },
  ],
  createdAt: "2026-09-02T08:51:47.599Z",
  updatedAt: "2026-10-28T19:11:28.599Z",
} as const satisfies Module
