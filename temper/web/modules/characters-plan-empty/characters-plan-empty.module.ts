import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersPlanEmpty = {
  id: "01a0642c-5b95-779d-b9c3-a49dd9b5044a",
  type: "page-type/module",
  slug: "characters-plan-empty",
  definition: "the empty characters plan",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
  ],
  createdAt: "2026-09-02T22:10:23.765Z",
  updatedAt: "2026-09-27T11:36:30.000Z",
} as const satisfies Module
