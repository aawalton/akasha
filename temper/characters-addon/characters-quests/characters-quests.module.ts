import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const charactersQuests = {
  id: "01a062e9-b6ff-701a-9ffe-9629cecd430c",
  pageTypeSlug: "module",
  type: "module",
  slug: "characters-quests",
  definition: "the quests the character now played has completed, read into the saved table",
  code: "ts",
} as const satisfies Module
