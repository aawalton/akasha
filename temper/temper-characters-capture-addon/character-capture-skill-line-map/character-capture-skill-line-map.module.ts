import type { Module } from "@akasha/code-system/module"

export const characterCaptureSkillLineMap = {
  id: "01a0616b-0b56-7a15-96fe-ccb28c313a6a",
  pageTypeSlug: "module",
  slug: "character-capture-skill-line-map",
  definition: "each skill line's place in a build hash, with its ranks and morphable abilities",
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
