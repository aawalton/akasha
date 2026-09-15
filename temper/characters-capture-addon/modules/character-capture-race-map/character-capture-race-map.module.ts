import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const characterCaptureRaceMap = {
  id: "01a0616b-4cc4-79a8-bbd5-ed51f0322bc0",
  type: "module",
  slug: "character-capture-race-map",
  definition: "each race's game id against its place in a build hash",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A place in this table is the number a saved build hash has.",
    },
  ],
} as const satisfies Module
