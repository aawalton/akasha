import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const watcherInventorySnapshotLanding = {
  id: "01a0a65d-ef8f-7a9e-b659-47f2639b391a",
  type: "page-type/module",
  slug: "watcher-inventory-snapshot-landing",
  definition: "the page a scan is filed as, and the scan's own data file beside it",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A scan is filed as one page named for the instant that scan was taken.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The page and the data file beside it land together or not at all.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A scan whose page is filed already is left alone rather than written again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The data file holds the whole scan as the one JSON document the scan is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value the scan does not carry is left off the page rather than filed as null.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "The rows a scan's slots, bags and currencies become are not filed yet.",
    },
  ],
} as const satisfies Module
