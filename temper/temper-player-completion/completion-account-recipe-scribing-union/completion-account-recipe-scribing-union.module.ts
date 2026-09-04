import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const completionAccountRecipeScribingUnion = {
  id: "01a06121-f0d0-7909-91ae-6949dbbffa0f",
  pageTypeSlug: "module",
  slug: "completion-account-recipe-scribing-union",
  definition: "the recipes and the scribing scripts any one character of an account knows",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "What one character knows counts as known for the account.",
    },
  ],
} as const satisfies Module
