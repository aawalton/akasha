import type { Module } from "@akasha/code-system/module"

export const watcherInventorySnapshotName = {
  id: "01a0633f-8d1e-72bf-94b4-33c274b877c8",
  pageTypeSlug: "module",
  slug: "watcher-inventory-snapshot-name",
  definition: "the name an inventory snapshot and each of its chunks is kept under",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A snapshot is named for the moment the game captured the data.",
    },
    {
      invariantKind: "departure",
      statement: "That moment is read as the instant a reading states rather than as a count.",
    },
    {
      invariantKind: "departure",
      statement: "A name holds nothing finer than whole seconds.",
    },
    {
      invariantKind: "departure",
      statement: "A colon in the time becomes a hyphen.",
    },
    {
      invariantKind: "departure",
      statement: "The letter parting the date from the time becomes a hyphen.",
    },
    {
      invariantKind: "departure",
      statement: "A chunk is named for its snapshot and the number of the chunk.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads or writes a file.",
    },
  ],
} as const satisfies Module
