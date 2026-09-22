import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsRowsFirst = {
  id: "01a08e66-0b80-7e5b-a02a-6ceb5642caab",
  type: "page-type/module",
  slug: "sets-rows-first",
  definition: "the first sixty-two numbered set parts put into one list",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The parts are spread in the order their numbers run.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No row is keyed by its id here.",
    },
  ],
} as const satisfies Module
