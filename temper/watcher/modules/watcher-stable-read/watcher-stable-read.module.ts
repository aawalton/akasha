import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const watcherStableRead = {
  id: "01a0635b-79f7-7b16-a5de-404b96e64447",
  type: "page-type/module",
  slug: "watcher-stable-read",
  definition: "how the watcher waits for the game to finish writing a file before reading it",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A file is judged settled by its size and its modification time together.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file counts as settled only after enough looks agree in a row.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run of agreeing looks under the number required never settles a file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file that changed between the settled look and the read is looked at afresh.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file that went away while being watched is answered as nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file still unsettled at the deadline is answered as nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A saved-variables file the game finished writing closes with a brace.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A saved-variables file opens with the assignment of a named variable.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file failing either test is whole at neither end and is held to be broken.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the file's contents beyond its two ends.",
    },
  ],
} as const satisfies Module
