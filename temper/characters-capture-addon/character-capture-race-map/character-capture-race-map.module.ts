import type { Module } from "@akasha/code/module"

export const characterCaptureRaceMap = {
  id: "01a0616b-4cc4-79a8-bbd5-ed51f0322bc0",
  pageTypeSlug: "module",
  slug: "character-capture-race-map",
  definition: "each race's game id against its place in a build hash",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A place in this table is the number a saved build hash has.",
    },
  ],
} as const satisfies Module
