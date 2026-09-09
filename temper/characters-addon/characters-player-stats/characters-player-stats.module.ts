import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const charactersPlayerStats = {
  id: "01a062ed-3953-7006-94d1-870f11c3c3fc",
  pageTypeSlug: "module",
  slug: "characters-player-stats",
  definition:
    "the name, build hash and curse of the character now played, read into the saved table",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A character the saved table does not yet hold is given a row rather than skipped.",
    },
  ],
} as const satisfies Module
