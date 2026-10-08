import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const shortcutSectionCard = {
  id: "01a06432-b190-7746-bbbc-15e16fa5228e",
  type: "page-type/module",
  slug: "shortcut-section-card",
  definition: "a group of keyboard shortcuts drawn as a card",
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
