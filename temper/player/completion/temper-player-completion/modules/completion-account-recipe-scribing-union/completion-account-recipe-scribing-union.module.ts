import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const completionAccountRecipeScribingUnion = {
  id: "01a06121-f0d0-7909-91ae-6949dbbffa0f",
  type: "page-type/module",
  slug: "completion-account-recipe-scribing-union",
  definition: "the recipes and the scribing scripts any character of an account knows",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A recipe or a script one character knows counts as known for the account.",
    },
  ],
  createdAt: "2026-09-02T08:00:09.424Z",
  updatedAt: "2026-09-22T10:15:52.000Z",
} as const satisfies Module
