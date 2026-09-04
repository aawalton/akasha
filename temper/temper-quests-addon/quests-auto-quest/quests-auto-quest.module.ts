import type { Module } from "@akasha/code-system/module"

export const questsAutoQuest = {
  id: "01a0635f-391c-7561-9ad8-9f05904aa99c",
  pageTypeSlug: "module",
  slug: "quests-auto-quest",
  definition: "the game's dialogue read into a snapshot, and the decision carried back to the game",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The dialogue is read again on a fixed beat while a dialogue is open.",
    },
    {
      invariantKind: "departure",
      statement:
        "The beat starts when the game announces a dialogue and stops when the dialogue closes.",
    },
    {
      invariantKind: "departure",
      statement:
        "A menu is told apart from a second menu by the wording of the options the menu offers.",
    },
    {
      invariantKind: "departure",
      statement: "Tracing alone reads the dialogue without answering it.",
    },
    {
      invariantKind: "departure",
      statement: "Turning the addon off forgets what the addon remembered.",
    },
    {
      invariantKind: "constraint",
      statement: "The game returns a dialogue option as a row of values rather than as a record.",
    },
  ],
} as const satisfies Module
