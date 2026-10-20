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
    {
      decisionKind: "decision-kind/departure",
      statement: "A character with a live build and a target is planned on one card.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A character with only a live build or only a target has a card of that one build.",
    },
  ],
  createdAt: "2026-09-02T22:10:23.760Z",
  updatedAt: "2026-10-20T11:22:26.482Z",
} as const satisfies Module
