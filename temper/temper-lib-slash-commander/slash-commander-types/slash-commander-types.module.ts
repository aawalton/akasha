import type { Module } from "@akasha/code-system/module"

export const slashCommanderTypes = {
  id: "01a06066-8403-7c76-a731-fe8005c24e95",
  pageTypeSlug: "module",
  slug: "slash-commander-types",
  definition: "the shape of a command, a completion provider and the library global",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A class and the instances of that class are shaped apart.",
    },
    {
      invariantKind: "departure",
      statement: "A command holds its subcommands in a set and its aliases in a map.",
    },
    {
      invariantKind: "departure",
      statement: "Finding the command for a token answers the command beside the token.",
    },
  ],
} as const satisfies Module
