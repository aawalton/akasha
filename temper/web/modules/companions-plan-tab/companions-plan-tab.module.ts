import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionsPlanTab = {
  id: "01a06421-2528-72ff-bdf2-df35b8e3aa96",
  type: "page-type/module",
  slug: "companions-plan-tab",
  definition: "the tab for working a companion plan",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
  ],
  createdAt: "2026-09-02T21:58:08.936Z",
  updatedAt: "2026-09-27T12:03:36.000Z",
} as const satisfies Module
