import type { Module } from "@akasha/code-system/module"

export const questsEntry = {
  id: "01a0635f-391c-75b0-b95a-d199d158f50a",
  pageTypeSlug: "module",
  slug: "quests-entry",
  definition: "the order the addon's parts are set going in once the game has loaded it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Nothing is set going before the game says the addon has loaded.",
    },
    {
      invariantKind: "departure",
      statement: "The saved variables are reached before any other part of the addon runs.",
    },
    {
      invariantKind: "departure",
      statement: "The global is published as the bundle loads rather than on the loaded event.",
    },
  ],
} as const satisfies Module
