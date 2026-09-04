import type { Module } from "@akasha/code-system/module"

export const chatMessageSlashCommand = {
  id: "01a06060-0d17-7d7f-864e-3a5ca6427262",
  pageTypeSlug: "module",
  slug: "chat-message-slash-command",
  definition: "the slash command a player changes the chat message settings through",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An unrecognized command prints the usage text.",
    },
    {
      invariantKind: "departure",
      statement: "A command given no argument reports the current setting.",
    },
  ],
} as const satisfies Module
