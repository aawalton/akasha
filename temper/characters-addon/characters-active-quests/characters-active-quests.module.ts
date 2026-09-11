import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const charactersActiveQuests = {
  id: "01a062e9-b6ff-701c-9ee8-9608dc0eea33",
  type: "module",
  slug: "characters-active-quests",
  definition: "the quests in the journal now, each with its name and the hint shown beneath it",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A condition the game gives already has its own count in its text.",
    },
  ],
} as const satisfies Module
