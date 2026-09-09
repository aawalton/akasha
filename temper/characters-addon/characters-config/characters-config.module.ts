import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const charactersConfig = {
  id: "01a062ed-3943-7005-848b-bc9123920f2f",
  pageTypeSlug: "module",
  slug: "characters-config",
  definition: "the character order, the tasks and the completion floors that are in force",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A value the Lua table states is preferred to the value the saved table says.",
    },
  ],
} as const satisfies Module
