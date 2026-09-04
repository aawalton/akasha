import type { Module } from "@akasha/code-system/module"

export const characterCaptureSkillLineRanks = {
  id: "01a0616b-b903-7191-873a-e4fde46698f7",
  pageTypeSlug: "module",
  slug: "character-capture-skill-line-ranks",
  definition: "each skill line's place in a build hash, its top rank and its order",
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
