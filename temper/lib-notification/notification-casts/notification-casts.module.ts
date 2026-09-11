import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const notificationCasts = {
  id: "01a0605a-0516-7516-a0f3-ef7984de267b",
  pageTypeSlug: "module",
  type: "module",
  slug: "notification-casts",
  definition: "what a value out of the game's untyped panel tables is read as",
  code: "ts",
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing here checks a value at run time.",
    },
  ],
} as const satisfies Module
