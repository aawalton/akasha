import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const engineStringsReading = {
  id: "01a0d417-685a-7536-aae7-8ce26e0dfc6b",
  type: "page-type/module",
  slug: "engine-strings-reading",
  definition: "the reading taking the text of the game's interface strings out of a capture",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The text is read from the interface string catalog's table rather than from Lua.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A catalog holding no strings is read as nothing rather than as an empty table.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A string held as anything but text is passed over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The names are sorted here, so what is written turns only where the game did.",
    },
  ],
  createdAt: "2026-09-24T15:44:58.970Z",
  updatedAt: "2026-10-19T17:44:55.507Z",
} as const satisfies Module
