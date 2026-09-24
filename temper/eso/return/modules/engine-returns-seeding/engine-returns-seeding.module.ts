import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const engineReturnsSeeding = {
  id: "01a0d3c6-faa9-7055-a0c7-5406e809aa28",
  type: "page-type/module",
  slug: "engine-returns-seeding",
  definition: "the Lua putting a documented function's empty answer into a sandbox",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A Lua chunk holds a fixed count of constants, and the table is wider than that.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The functions are handed over in chunks rather than in one chunk.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each function is written as Lua giving back the kinds the table names.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A kind that is nothing would leave a hole in a list of values.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Writing the answer as Lua rather than as a list carries a hole faithfully.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The chunks are ordered by name, so two runs hand the sandbox the same Lua.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The names of the methods a control answers to are handed over in one call.",
    },
  ],
} as const satisfies Module
