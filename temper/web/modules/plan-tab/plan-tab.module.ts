import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const planTab = {
  id: "01a0642c-5b90-7ad7-8e2f-c7aad5cfa434",
  type: "page-type/module",
  slug: "plan-tab",
  definition: "the tab planning a character",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A character is patched where its account page is the viewer's by address.",
    },
  ],
  createdAt: "2026-09-02T22:10:23.760Z",
  updatedAt: "2026-09-24T16:25:52.000Z",
} as const satisfies Module
