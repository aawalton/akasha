import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const charactersActiveQuests = {
  id: "01a062e9-b6ff-701c-9ee8-9608dc0eea33",
  pageTypeSlug: "module",
  slug: "characters-active-quests",
  definition: "the quests in the journal now, each with its name and the hint shown beneath it",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A condition the game gives already carries its own count in its text.",
    },
  ],
} as const satisfies Module
