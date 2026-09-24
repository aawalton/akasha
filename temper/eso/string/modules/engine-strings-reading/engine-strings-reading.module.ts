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
      statement: "The text is read from the first account holding it, by sorted name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A capture holding no strings is read as nothing rather than as an empty table.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file that will not parse is read as nothing rather than raising.",
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
} as const satisfies Module
