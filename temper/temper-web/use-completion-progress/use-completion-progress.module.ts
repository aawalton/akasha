import type { Module } from "@akasha/code/module"

export const useCompletionProgress = {
  id: "01a06421-f74b-726d-a820-51afc5be003b",
  pageTypeSlug: "module",
  slug: "use-completion-progress",
  definition: "the progress every completion tab is handed",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Whether the catalogs have loaded is part of whether this module is loading.",
    },
    {
      invariantKind: "departure",
      statement: "A transform gives back zeros against an empty catalog rather than throwing.",
    },
    {
      invariantKind: "departure",
      statement:
        "A caller reading before the catalogs arrive would show a real-looking zero per cent.",
    },
    {
      invariantKind: "constraint",
      statement:
        "An account ask answers at most one row, so the first body answered with is that account's.",
    },
  ],
} as const satisfies Module
