import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const questsChatterNames = {
  id: "01a0635f-391c-7d96-b9fc-59c4612f34d7",
  type: "page-type/module",
  slug: "quests-chatter-names",
  definition: "the name behind a dialogue option code, looked up for whoever reads a trace",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The map from code to name is built once and kept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A code the game names nothing for reads back as the code itself.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name the globals do not have is left out of the map.",
    },
  ],
} as const satisfies Module
