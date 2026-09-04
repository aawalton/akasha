import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const canUnlockFilter = {
  id: "01a06100-3be8-751b-bf3a-5525027297a8",
  pageTypeSlug: "module",
  slug: "can-unlock-filter",
  definition: "the Can Unlock condition a rule may carry, as the rule editor offers it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This filter reads and writes the `canUnlock` condition alone.",
    },
  ],
} as const satisfies Module
