import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const watcherRunOutcome = {
  id: "01a0633f-8d1d-7d93-a711-1559acdac009",
  type: "page-type/module",
  slug: "watcher-run-outcome",
  definition: "what a run of the watcher did to each file it carried across",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An operation is known by its name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The kinds and states an operation takes are those the enrolment declares.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An operation held keeps the id its row was given.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An operation replaces whatever was held under the same name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Merged operations come back ordered by name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run counts as carried across only when every operation the run has is synced.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A modification time at or below zero is no time.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reports anything anywhere.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads or writes a file.",
    },
  ],
} as const satisfies Module
