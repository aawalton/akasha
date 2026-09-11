import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const instantIn = {
  id: "01a08ede-8410-7714-9f40-0a0f13800b21",
  type: "module",
  slug: "instant-in",
  definition: "the moment in milliseconds a value holds, or nothing",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A number is the milliseconds that number already counts.",
    },
    {
      invariantKind: "departure",
      statement: "Text is the moment that text spells.",
    },
    {
      invariantKind: "departure",
      statement: "A value holding no moment is nothing rather than the epoch.",
    },
    {
      invariantKind: "departure",
      statement: "A value that is neither a number nor text holds no moment.",
    },
  ],
} as const satisfies Module
