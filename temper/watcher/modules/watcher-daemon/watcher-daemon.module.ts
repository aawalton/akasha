import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const watcherDaemon = {
  id: "01a06039-9c89-7821-837a-8edf111d90af",
  type: "module",
  slug: "watcher-daemon",
  definition: "the file naming the watcher worker that is running, and where that worker logs",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "One file names the worker that is running.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That file has the worker's process id.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That file carries when the worker started.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That file has the log the worker writes to.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file the worker's shape does not fit reads as no worker.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file that will not open reads as no worker.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That file is readable by its owner alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A process id that cannot be probed is taken as dead.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The worker entry is a path under the checkout rather than a built artifact.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Where that entry sits under the checkout is asked of the index rather than spelled.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A missing worker entry is refused as an operational fault.",
    },
  ],
} as const satisfies Module
