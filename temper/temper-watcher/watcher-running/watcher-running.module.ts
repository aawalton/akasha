import type { Module } from "@akasha/code-system/module"

export const watcherRunning = {
  id: "01a06039-9c8a-7d50-ae3b-e4e658fa6344",
  pageTypeSlug: "module",
  slug: "watcher-running",
  definition: "the watcher worker started and held in the foreground until it ends",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The worker is held in the foreground.",
    },
    {
      invariantKind: "departure",
      statement: "A simple unit runs the worker.",
    },
    {
      invariantKind: "departure",
      statement: "The worker runs from source rather than from a build.",
    },
    {
      invariantKind: "departure",
      statement: "Whatever the worker writes is appended to the worker log.",
    },
    {
      invariantKind: "departure",
      statement: "The file naming the running worker is written before the worker is reported.",
    },
    {
      invariantKind: "departure",
      statement: "A worker already named by that file and still alive refuses a second start.",
    },
    {
      invariantKind: "departure",
      statement: "A stop signal is carried through to the worker.",
    },
    {
      invariantKind: "departure",
      statement: "The file naming the running worker is cleared once the worker ends.",
    },
    {
      invariantKind: "departure",
      statement: "A worker ended by a signal this module took is a clean stop.",
    },
    {
      invariantKind: "departure",
      statement: "A worker that ended on its own answers with the code the worker ended on.",
    },
  ],
} as const satisfies Module
