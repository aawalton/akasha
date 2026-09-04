import type { Module } from "@akasha/code-system/module"

export const characterCaptureAllianceMap = {
  id: "01a0616b-5a16-7e5f-b792-c43a0671a8d9",
  pageTypeSlug: "module",
  slug: "character-capture-alliance-map",
  definition: "each alliance's game id against its place in a build hash",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A place in this table is the number a saved build hash carries.",
    },
    {
      invariantKind: "gap",
      statement: "An entry moved to another place misreads every build hash already saved.",
    },
  ],
} as const satisfies Module
