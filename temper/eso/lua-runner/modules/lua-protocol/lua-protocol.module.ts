import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const luaProtocol = {
  id: "01a06059-2491-7831-9607-9a067a9a884b",
  type: "page-type/module",
  slug: "lua-protocol",
  definition: "the sentinels and the answer shape shared by the driver and its caller",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The sentinels are written once here and read by both sides.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An answer is parsed rather than trusted.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tagged object naming a number JSON cannot have becomes that number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tagged object naming a function is left tagged and frozen.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here runs a process.",
    },
  ],
} as const satisfies Module
