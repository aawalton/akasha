import type { EsoAddon } from "akasha/code/eso-addons/eso-addon.page-type.types.ts"

export const temperLibChatMessage = {
  id: "01a06060-0d13-746b-9617-c8f4b7d288ce",
  type: "eso-addon",
  slug: "temper-lib-chat-message",
  definition: "an addon library printing tagged chat messages and restoring chat across sessions",

  addonManifest: "json",
  bundleEntry: "chat-message-main",
  parts: [
    "module/chat-history",
    "module/chat-links",
    "module/chat-message-casts",
    "module/chat-message-constants",
    "module/chat-message-formatters",
    "module/chat-message-lib",
    "module/chat-message-lifecycle",
    "module/chat-message-main",
    "module/chat-message-public-api",
    "module/chat-message-slash-command",
    "module/chat-message-strings",
    "module/chat-message-types",
    "module/chat-proxy",
    "module/chat-saved-data",
    "type-declaration/chat-message-declarations",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A message is printed through the game's chat router rather than a direct chat call.",
    },
    {
      invariantKind: "departure",
      statement: "A tagged message has the tag of the addon that printed the message.",
    },
    {
      invariantKind: "departure",
      statement: "A time prefix is read from the local clock in whole seconds.",
    },
    {
      invariantKind: "departure",
      statement: "Chat history is restored once the player has entered the world.",
    },
    {
      invariantKind: "departure",
      statement: "A restored message keeps the timestamp the message was first stored under.",
    },
    {
      invariantKind: "constraint",
      statement: "A caller reaches this library through a game global rather than an import.",
    },
  ],
} as const satisfies EsoAddon
