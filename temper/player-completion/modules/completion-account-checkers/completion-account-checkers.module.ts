import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const completionAccountCheckers = {
  id: "01a0640c-1e9b-77aa-9215-d1a1abde163f",
  type: "page-type/module",
  slug: "completion-account-checkers",
  definition: "what answers whether an account has finished each account-wide completion card",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "The registry is empty and nothing here can fill it.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "The registry names every account card the category tree has.",
    },
  ],
} as const satisfies Module
