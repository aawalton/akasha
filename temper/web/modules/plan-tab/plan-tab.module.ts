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
} as const satisfies Module
