import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const requireSavedVariables = {
  id: "01a08e11-e16f-78aa-8cc2-9f44f46d50cf",
  type: "module",
  slug: "require-saved-variables",
  definition: "the add-on's saved table, or a refusal where no session has opened it yet",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement:
        "A read before the session opens the table is a refusal rather than an empty table.",
    },
  ],
} as const satisfies Module
