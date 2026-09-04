import type { Module } from "@akasha/code-system/module"

export const characterCaptureCurseMap = {
  id: "01a0616b-c4eb-7239-a6d1-ba1f09953f22",
  pageTypeSlug: "module",
  slug: "character-capture-curse-map",
  definition: "the vampire and werewolf ability ids against their place in a build hash",
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
