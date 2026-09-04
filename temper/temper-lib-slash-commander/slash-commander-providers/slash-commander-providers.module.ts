import type { Module } from "@akasha/code-system/module"

export const slashCommanderProviders = {
  id: "01a06066-8402-7658-aac7-0ba6020e3995",
  pageTypeSlug: "module",
  slug: "slash-commander-providers",
  definition: "what a chat completion is offered from for a token the player has typed",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A provider answers only where the token opens with the provider's prefix.",
    },
    {
      invariantKind: "departure",
      statement: "A result is keyed by the alias in lower case and shown as a label.",
    },
    {
      invariantKind: "departure",
      statement: "A label differing from its alias is kept in a lookup back to the alias.",
    },
    {
      invariantKind: "departure",
      statement: "The slash provider offers the game's commands and the channel switches together.",
    },
    {
      invariantKind: "departure",
      statement: "The subcommand provider offers the aliases beneath one command.",
    },
  ],
} as const satisfies Module
