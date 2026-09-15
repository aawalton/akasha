import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const instantIn = {
  id: "01a08ede-8410-7714-9f40-0a0f13800b21",
  type: "module",
  slug: "instant-in",
  definition: "the moment in milliseconds a value holds, or nothing",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A number is the milliseconds that number already counts.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Text is the moment that text spells.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value holding no moment is nothing rather than the epoch.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value that is neither a number nor text holds no moment.",
    },
  ],
} as const satisfies Module
