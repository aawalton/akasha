import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const watcherInventorySnapshotName = {
  id: "01a0633f-8d1e-72bf-94b4-33c274b877c8",
  type: "module",
  slug: "watcher-inventory-snapshot-name",
  definition: "the name an inventory snapshot is kept under",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A snapshot is named for the moment the game captured the data.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That moment is read as the instant a reading states rather than as a count.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name has nothing finer than whole seconds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A colon in the time becomes a hyphen.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The letter parting the date from the time becomes a hyphen.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads or writes a file.",
    },
  ],
} as const satisfies Module
