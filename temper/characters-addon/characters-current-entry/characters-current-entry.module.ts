import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const charactersCurrentEntry = {
  id: "01a062d2-92a3-7002-91a3-58a915f7ea72",
  pageTypeSlug: "module",
  slug: "characters-current-entry",
  definition: "the saved table row of the character now played, or nothing where the game has none",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "Which row the character now played is kept in is worked out in one place.",
    },
  ],
} as const satisfies Module
