import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsAll = {
  id: "01a061a4-18b0-70f3-9811-f8f48f7e103b",
  type: "page-type/module",
  slug: "sets-all",
  definition: "every gear set the game holds, keyed by id, from the table the set pages write",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A set's place in this table is the index a build hash has.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The no-set sentinel is the first row this table answers.",
    },
  ],
  hashIndexed: ["SETS_ALL_ROWS"],
} as const satisfies Module
