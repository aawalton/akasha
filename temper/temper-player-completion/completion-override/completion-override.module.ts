import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const completionOverride = {
  id: "01a06103-061b-7457-afea-60b18bad59f0",
  pageTypeSlug: "module",
  slug: "completion-override",
  definition: "a floor a player sets by hand under one item of one completion card",
  code: "ts",
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing here runs.",
    },
  ],
} as const satisfies Module
