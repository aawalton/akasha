import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const watcherRunning = {
  id: "01a06039-9c8a-7d50-ae3b-e4e658fa6344",
  type: "module",
  slug: "watcher-running",
  definition: "the watcher worker started and held in the foreground until it ends",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The worker is in the foreground.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A simple unit runs the worker.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The worker runs from source rather than from a build.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Whatever the worker writes is appended to the worker log.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The file naming the running worker is written before the worker is reported.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A worker already named by that file and still alive refuses a second start.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A stop signal is carried through to the worker.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The file naming the running worker is cleared once the worker ends.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A worker ended by a signal this module took is a clean stop.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A worker that ended on its own answers with the code the worker ended on.",
    },
  ],
} as const satisfies Module
