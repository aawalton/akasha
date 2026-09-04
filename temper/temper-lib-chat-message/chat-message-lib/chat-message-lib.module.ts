import type { Module } from "@akasha/code-system/module"

export const chatMessageLib = {
  id: "01a06060-0d15-7e8d-81a2-d269b361c55f",
  pageTypeSlug: "module",
  slug: "chat-message-lib",
  definition: "the library object every caller of the chat message library reaches",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A setting read before the saved settings load falls back to the default.",
    },
    {
      invariantKind: "departure",
      statement: "Registering a custom chat link marks that link type valid for chat.",
    },
    {
      invariantKind: "departure",
      statement: "A custom chat link with no reformatter is rebuilt as a plain game link.",
    },
  ],
} as const satisfies Module
