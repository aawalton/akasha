import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const settingsPageContent = {
  id: "01a06432-b190-7ada-a120-f8ab3c8de27b",
  type: "page-type/module",
  slug: "settings-page-content",
  definition: "the settings page and its tabs",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
  ],
  createdAt: "2026-09-02T22:17:18.992Z",
  updatedAt: "2026-09-27T11:43:32.000Z",
} as const satisfies Module
