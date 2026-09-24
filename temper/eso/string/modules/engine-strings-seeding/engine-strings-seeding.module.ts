import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const engineStringsSeeding = {
  id: "01a0d417-b676-7d76-87ba-29c4cd637ae9",
  type: "page-type/module",
  slug: "engine-strings-seeding",
  definition: "the Lua answering the game's string getter in a sandbox from the captured text",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The game's string getter answers the captured text for a string's number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A string's number is read from the captured constants loaded before this.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name's prefix and the number after it are read as the name they join into.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Text the game's own Lua adds for a string is read before the captured text.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A string the capture holds no text for answers the empty string.",
    },
  ],
} as const satisfies Module
