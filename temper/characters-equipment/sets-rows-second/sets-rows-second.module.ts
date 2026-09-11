import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const setsRowsSecond = {
  id: "01a08e66-1f4e-7974-86a0-547f57e1c025",
  type: "module",
  slug: "sets-rows-second",
  definition: "the last sixty-two numbered set parts gathered into one list",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The parts are spread in the order their numbers run.",
    },
    {
      invariantKind: "absence",
      statement: "No row is keyed by its id here.",
    },
  ],
} as const satisfies Module
