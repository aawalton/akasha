import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const completionAccountLoreUnion = {
  id: "01a06121-f0cf-76af-8eef-3e43cfd843c9",
  type: "page-type/module",
  slug: "completion-account-lore-union",
  definition: "the shalidor books any one character of an account has read",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A book read by one character counts as read for the account.",
    },
  ],
} as const satisfies Module
