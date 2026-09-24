import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const engineAnswersSeeding = {
  id: "01a0d42d-d5e9-7c21-9ca2-4e0d8661134e",
  type: "page-type/module",
  slug: "engine-answers-seeding",
  definition: "the Lua giving back in a sandbox what the running game answered a function",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A function the game answered gives back those answers, in the order given.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What the game answered is set over the empty answer the documentation names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The functions are written ordered by name, so two runs hand the sandbox the same Lua.",
    },
  ],
} as const satisfies Module
