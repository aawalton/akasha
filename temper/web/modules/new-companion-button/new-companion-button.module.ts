import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const newCompanionButton = {
  id: "01a0641f-8bf0-7f78-988d-35d9b165d932",
  type: "page-type/module",
  slug: "new-companion-button",
  definition: "the button creating a companion",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
  ],
  createdAt: "2026-09-02T21:56:24.176Z",
  updatedAt: "2026-09-27T11:30:47.000Z",
} as const satisfies Module
