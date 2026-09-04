import type { Module } from "@akasha/code-system/module"

export const slashCommand = {
  id: "01a06066-8401-7395-abd7-61fa46d501e7",
  pageTypeSlug: "module",
  slug: "slash-command",
  definition: "one slash command, its aliases, its callback and the commands beneath it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Calling a command with text matching a subcommand alias calls that subcommand.",
    },
    {
      invariantKind: "departure",
      statement: "The text after the matched alias is handed on to the subcommand.",
    },
    {
      invariantKind: "constraint",
      statement: "Calling a command carrying no callback raises an error.",
    },
    {
      invariantKind: "departure",
      statement: "An alias added to a command is added to the parent as a subcommand alias.",
    },
    {
      invariantKind: "constraint",
      statement: "A command already carrying a parent may not be given a second parent.",
    },
    {
      invariantKind: "departure",
      statement: "Registering the first subcommand turns completion on for the parent.",
    },
    {
      invariantKind: "departure",
      statement: "Unregistering the last subcommand turns completion off again.",
    },
  ],
} as const satisfies Module
