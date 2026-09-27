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
} as const satisfies Module
