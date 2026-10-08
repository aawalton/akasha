import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const recentCompanionsCard = {
  id: "01a06432-b190-707d-9aa2-09a10504c822",
  type: "page-type/module",
  slug: "recent-companions-card",
  definition: "the card listing the companion builds touched most recently",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A build's roles are named by the base role names module.",
    },
  ],
  createdAt: "2026-09-02T22:17:18.992Z",
  updatedAt: "2026-09-27T12:30:10.000Z",
} as const satisfies Module
