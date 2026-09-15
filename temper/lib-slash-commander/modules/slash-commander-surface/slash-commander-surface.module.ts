import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const slashCommanderSurface = {
  id: "01a06066-8401-74d7-a505-372d07f1090c",
  type: "page-type/module",
  slug: "slash-commander-surface",
  definition: "the calls another addon registers and labels a slash command by",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller hands in one alias or a list of aliases.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A registered command becomes a subcommand of the global command.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A callable is a function or a table the game may call.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A version already loaded keeps a second load of the same file from running.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Chat input is started only where the game permits talking to the target.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A wrapped function is called with the function wrapped as its first argument.",
    },
  ],
} as const satisfies Module
