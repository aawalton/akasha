import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsRowsSecond = {
  id: "01a08e66-1f4e-7974-86a0-547f57e1c025",
  type: "page-type/module",
  slug: "sets-rows-second",
  definition: "the last sixty-two numbered set parts put into one list",
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
