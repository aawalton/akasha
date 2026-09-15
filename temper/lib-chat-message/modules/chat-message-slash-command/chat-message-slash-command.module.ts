import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const chatMessageSlashCommand = {
  id: "01a06060-0d17-7d7f-864e-3a5ca6427262",
  type: "page-type/module",
  slug: "chat-message-slash-command",
  definition: "the slash command a player changes the chat message settings through",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An unrecognized command prints the usage text.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A command given no argument reports the current setting.",
    },
  ],
} as const satisfies Module
