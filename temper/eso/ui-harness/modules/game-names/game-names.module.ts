import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const gameNames = {
  id: "01a0d444-aa26-706c-bbd0-cd323b7fba4d",
  type: "page-type/module",
  slug: "game-names",
  definition: "the globals the game's own Lua defines",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A global is a function or a value a file names at the start of a line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A name the game's Lua defines answers with nothing until the file defining it loads.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The game's Lua asserts that a name is not yet defined before defining it.",
    },
  ],
  createdAt: "2026-09-24T16:34:24.934Z",
  updatedAt: "2026-09-24T16:35:13.000Z",
} as const satisfies Module
