import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const chatEntryText = {
  id: "01a090b3-cd34-73db-8728-72f922749cda",
  pageTypeSlug: "module",
  type: "module",
  slug: "chat-entry-text",
  definition: "text written into the chat entry box for the player to send or edit",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Chat input is opened where the entry box does not already hold the focus.",
    },
    {
      invariantKind: "departure",
      statement: "Text is added where the cursor is rather than replacing what is there.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here sends what was written.",
    },
  ],
} as const satisfies Module
