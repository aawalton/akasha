import type { Module } from "@akasha/code-system/module"

export const chatMessageLifecycle = {
  id: "01a06060-0d17-7a41-90e4-e85bd3b90570",
  pageTypeSlug: "module",
  slug: "chat-message-lifecycle",
  definition: "the work the chat message library does once the game has loaded it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Saved settings are reconciled against the defaults on every load.",
    },
    {
      invariantKind: "departure",
      statement: "History is restored one frame after the player enters the world.",
    },
    {
      invariantKind: "departure",
      statement: "History older than the maximum age is dropped rather than restored.",
    },
    {
      invariantKind: "departure",
      statement: "Settings are saved under the world and display name of the account.",
    },
  ],
} as const satisfies Module
