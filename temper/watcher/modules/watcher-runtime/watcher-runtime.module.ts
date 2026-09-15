import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const watcherRuntime = {
  id: "01a0633f-8d1e-7bd8-9b34-b4ebc19498e9",
  type: "module",
  slug: "watcher-runtime",
  definition: "whether the watcher worker runs from source or from a compiled executable",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Running from source is declared by the environment rather than worked out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only the exact word `source` means the worker runs from source.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An unset variable means the worker runs from a compiled executable.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a file or a process.",
    },
  ],
} as const satisfies Module
