import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const completionAccountUnionProgress = {
  id: "01a06121-f0d0-722c-807d-db30e0d75f2d",
  pageTypeSlug: "module",
  slug: "completion-account-union-progress",
  definition: "the quests any one character or companion of an account has finished",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A quest finished by one character counts as finished for the account.",
    },
  ],
} as const satisfies Module
