import type { Module } from "@akasha/code-system/module"

export const slashCommanderChatHooks = {
  id: "01a06066-8402-78aa-b672-71043d11a094",
  pageTypeSlug: "module",
  slug: "slash-commander-chat-hooks",
  definition: "the game's chat entry hooked so a command's own completions are offered",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The keyboard chat and the gamepad chat are hooked the same way.",
    },
    {
      invariantKind: "departure",
      statement: "The command a token belongs to is found by walking down the subcommand aliases.",
    },
    {
      invariantKind: "departure",
      statement: "The text before the token is kept so a chosen completion is put back after it.",
    },
    {
      invariantKind: "departure",
      statement: "The game's own completion runs where no command claims the token.",
    },
    {
      invariantKind: "departure",
      statement: "Matches are ordered from the closest to the token down to the furthest.",
    },
    {
      invariantKind: "departure",
      statement: "Setting up the chat entry runs one time.",
    },
    {
      invariantKind: "departure",
      statement: "A second setup does nothing.",
    },
  ],
} as const satisfies Module
