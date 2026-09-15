import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const watcherRunOutcome = {
  id: "01a0633f-8d1d-7d93-a711-1559acdac009",
  type: "module",
  slug: "watcher-run-outcome",
  definition: "what one run of the watcher did to each file it carried across",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "An operation is known by its name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An operation replaces whatever was held under the same name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Merged operations come back ordered by name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run counts as carried across only when every operation the run has is synced.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A modification time at or below zero is no time.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reports anything anywhere.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads or writes a file.",
    },
  ],
} as const satisfies Module
