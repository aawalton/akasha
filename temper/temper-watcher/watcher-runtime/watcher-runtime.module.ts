import type { Module } from "@akasha/code-system/module"

export const watcherRuntime = {
  id: "01a0633f-8d1e-7bd8-9b34-b4ebc19498e9",
  pageTypeSlug: "module",
  slug: "watcher-runtime",
  definition: "whether the watcher worker runs from source or from a compiled executable",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Running from source is declared by the environment rather than worked out.",
    },
    {
      invariantKind: "departure",
      statement: "Only the exact word `source` means the worker runs from source.",
    },
    {
      invariantKind: "departure",
      statement: "An unset variable means the worker runs from a compiled executable.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a file or a process.",
    },
  ],
} as const satisfies Module
