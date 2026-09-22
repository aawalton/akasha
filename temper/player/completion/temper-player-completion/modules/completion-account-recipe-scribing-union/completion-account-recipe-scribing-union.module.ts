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
} as const satisfies Module
