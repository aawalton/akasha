import type { Module } from "@akasha/code-system/module"

export const watcherRunOutcome = {
  id: "01a0633f-8d1d-7d93-a711-1559acdac009",
  pageTypeSlug: "module",
  slug: "watcher-run-outcome",
  definition: "what one run of the watcher did to each file it carried across",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An operation is known by its name.",
    },
    {
      invariantKind: "departure",
      statement: "An operation replaces whatever was held under the same name.",
    },
    {
      invariantKind: "departure",
      statement: "Merged operations come back ordered by name.",
    },
    {
      invariantKind: "departure",
      statement:
        "A run counts as carried across only when every operation the run holds is synced.",
    },
    {
      invariantKind: "departure",
      statement: "A modification time at or below zero is no time.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reports anything anywhere.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads or writes a file.",
    },
  ],
} as const satisfies Module
