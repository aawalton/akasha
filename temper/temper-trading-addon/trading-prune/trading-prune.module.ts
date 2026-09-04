import type { Module } from "@akasha/code-system/module"

export const tradingPrune = {
  id: "01a06160-2a5b-7de7-92b4-c3276f6bde81",
  pageTypeSlug: "module",
  slug: "trading-prune",
  definition: "dropping the listings that have aged past the expiry",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A listing older than the expiry is no longer what the guild store holds.",
    },
  ],
} as const satisfies Module
