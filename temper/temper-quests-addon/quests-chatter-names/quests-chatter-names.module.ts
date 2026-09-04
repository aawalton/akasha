import type { Module } from "@akasha/code-system/module"

export const questsChatterNames = {
  id: "01a0635f-391c-7d96-b9fc-59c4612f34d7",
  pageTypeSlug: "module",
  slug: "quests-chatter-names",
  definition: "the name behind a dialogue option code, looked up for whoever reads a trace",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The map from code to name is built once and kept.",
    },
    {
      invariantKind: "departure",
      statement: "A code the game names nothing for reads back as the code itself.",
    },
    {
      invariantKind: "departure",
      statement: "A name the globals do not carry is left out of the map.",
    },
  ],
} as const satisfies Module
