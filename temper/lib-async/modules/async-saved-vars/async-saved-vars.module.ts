import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const asyncSavedVars = {
  id: "01a0606a-1c56-7944-b92f-f954e0fa0d94",
  type: "page-type/module",
  slug: "async-saved-vars",
  definition: "the stall threshold the game keeps for this library between sessions",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An absent saved value takes the default threshold.",
    },
  ],
} as const satisfies Module
