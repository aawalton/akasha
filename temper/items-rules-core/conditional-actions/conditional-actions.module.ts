import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const conditionalActions = {
  id: "01a06100-3be9-7bf7-90df-7f2075a39e68",
  pageTypeSlug: "module",
  slug: "conditional-actions",
  definition: "the actions the game addon takes only where a condition on the item holds",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An action here is written for the addon rather than for the web matcher.",
    },
  ],
} as const satisfies Module
