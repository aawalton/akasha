import type { Module } from "@akasha/code/module"

export const characterCaptureSetMap = {
  id: "01a0616b-ac58-72db-b5be-6386f22d086e",
  pageTypeSlug: "module",
  slug: "character-capture-set-map",
  definition: "each gear set's game id against its place in a build hash",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A place in this table is the number a saved build hash has.",
    },
  ],
} as const satisfies Module
