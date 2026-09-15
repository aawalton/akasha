import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const watcherRunStatus = {
  id: "01a0640f-8510-71f3-afa2-898d69327ed2",
  type: "module",
  slug: "watcher-run-status",
  definition: "one verdict over the operations the watcher reported from its last run",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "An entry with no name is dropped.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The name is the key an operation is merged by.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A state this build does not know reads as no state rather than as a guess.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A missing file outranks a parse failure.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A parse failure outranks a failed upload.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A failed upload outranks a sync.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run that attempted nothing confirms nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A summary has the very operations that decided the verdict.",
    },
  ],
} as const satisfies Module
