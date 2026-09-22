import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const engineConstantsSeeding = {
  id: "01a0cafe-77ad-7be1-b57d-13ea2f9ec1ed",
  type: "page-type/module",
  slug: "engine-constants-seeding",
  definition: "the Lua putting the engine's captured constants into a sandbox",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A Lua chunk holds a fixed count of constants, and the table is wider than that.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The constants are handed over in chunks rather than in one chunk.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A number and a word are handed over together, because Lua tells them apart.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A constant whose word the capture lost is passed over rather than seeded empty.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The chunks are ordered by name, so two runs hand the sandbox the same Lua.",
    },
  ],
} as const satisfies Module
