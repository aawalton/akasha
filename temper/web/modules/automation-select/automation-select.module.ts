import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const automationSelect = {
  id: "01a06432-b190-774c-ab52-27309a7ca3fa",
  type: "page-type/module",
  slug: "automation-select",
  definition: "a control choosing on, off or whatever the global setting says",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
  ],
  createdAt: "2026-09-02T22:17:18.992Z",
  updatedAt: "2026-09-27T11:31:47.000Z",
} as const satisfies Module
