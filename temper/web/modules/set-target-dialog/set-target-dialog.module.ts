import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setTargetDialog = {
  id: "01a06429-76ff-7b98-9350-f3aedb167a1a",
  type: "page-type/module",
  slug: "set-target-dialog",
  definition: "the list pointing a build at a character or companion",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
  ],
  createdAt: "2026-09-02T22:07:14.175Z",
  updatedAt: "2026-09-27T11:35:48.000Z",
} as const satisfies Module
