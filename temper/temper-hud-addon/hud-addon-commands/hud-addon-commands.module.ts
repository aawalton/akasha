import type { Module } from "@akasha/code-system/module"

export const hudAddonCommands = {
  id: "01a061c5-18dd-7006-8723-723b7648294e",
  pageTypeSlug: "module",
  slug: "hud-addon-commands",
  definition: "the one slash command every Temper add-on reaches its own subcommands through",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The slash command with no subcommand lists what is registered.",
    },
    {
      invariantKind: "departure",
      statement:
        "The listing groups the subcommands under the add-on that registered the subcommand.",
    },
    {
      invariantKind: "departure",
      statement: "A subcommand carrying no handler is listed and not dispatched to.",
    },
  ],
} as const satisfies Module
