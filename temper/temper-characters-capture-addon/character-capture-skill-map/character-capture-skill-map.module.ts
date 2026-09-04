import type { Module } from "@akasha/code-system/module"

export const characterCaptureSkillMap = {
  id: "01a0616b-8ea3-7699-aef6-4c54ee5ce7ec",
  pageTypeSlug: "module",
  slug: "character-capture-skill-map",
  definition: "each skill's game id against its place in a build hash",
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
