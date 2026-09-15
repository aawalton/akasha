import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const chatEntryText = {
  id: "01a090b3-cd34-73db-8728-72f922749cda",
  type: "page-type/module",
  slug: "chat-entry-text",
  definition: "text written into the chat entry box for the player to send or edit",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The player sends what the box holds, and no add-on sends it for them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Chat input is opened where the entry box does not already hold the focus.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Text is added where the cursor is rather than replacing what is there.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here sends what was written.",
    },
  ],
} as const satisfies Module
