import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsAll = {
  id: "01a061a4-18b0-70f3-9811-f8f48f7e103b",
  type: "page-type/module",
  slug: "sets-all",
  definition: "every gear set the game holds, keyed by id, as last read from the set pages",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A set's place in the catalogue is the index a build hash has.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The no-set sentinel is the first set the catalogue answers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One catalogue is held at a time, and a new reading replaces it whole.",
    },
  ],
} as const satisfies Module
