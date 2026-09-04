import type { Module } from "@akasha/code-system/module"

export const chatMessageFormatters = {
  id: "01a06060-0d17-74d0-ba57-905b629170b0",
  pageTypeSlug: "module",
  slug: "chat-message-formatters",
  definition: "the game's chat formatters wrapped so a tag and a time prefix are added",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A wrapper calls the formatter the game registered for the same event.",
    },
    {
      invariantKind: "departure",
      statement: "The wrapped formatter table is in place only while the game formats a message.",
    },
    {
      invariantKind: "departure",
      statement: "An event is stored in history before the event is formatted.",
    },
    {
      invariantKind: "departure",
      statement: "An event with no registered formatter raises an error.",
    },
  ],
} as const satisfies Module
