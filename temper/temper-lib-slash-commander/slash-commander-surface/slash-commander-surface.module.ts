import type { Module } from "@akasha/code-system/module"

export const slashCommanderSurface = {
  id: "01a06066-8401-74d7-a505-372d07f1090c",
  pageTypeSlug: "module",
  slug: "slash-commander-surface",
  definition: "the calls another addon registers and labels a slash command by",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A caller hands in one alias or a list of aliases.",
    },
    {
      invariantKind: "departure",
      statement: "A registered command becomes a subcommand of the global command.",
    },
    {
      invariantKind: "departure",
      statement: "A callable is a function or a table the game may call.",
    },
    {
      invariantKind: "departure",
      statement: "A version already loaded keeps a second load of the same file from running.",
    },
    {
      invariantKind: "departure",
      statement: "Chat input is started only where the game permits talking to the target.",
    },
    {
      invariantKind: "departure",
      statement: "A wrapped function is called with the function wrapped as its first argument.",
    },
  ],
} as const satisfies Module
