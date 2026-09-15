import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const watcherStableRead = {
  id: "01a0635b-79f7-7b16-a5de-404b96e64447",
  type: "module",
  slug: "watcher-stable-read",
  definition: "how the watcher waits for the game to finish writing a file before reading it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file is judged settled by its size and its modification time together.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file counts as settled only after enough looks agree in a row.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run of agreeing looks under the number required never settles a file.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file that changed between the settled look and the read is looked at afresh.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file that went away while being watched is answered as nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file still unsettled at the deadline is answered as nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A saved-variables file the game finished writing closes with a brace.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here parses the file's contents.",
    },
  ],
} as const satisfies Module
