import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const completionAccountLoreUnion = {
  id: "01a06121-f0cf-76af-8eef-3e43cfd843c9",
  pageTypeSlug: "module",
  slug: "completion-account-lore-union",
  definition: "the shalidor books any one character of an account has read",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A book read by one character counts as read for the account.",
    },
  ],
} as const satisfies Module
