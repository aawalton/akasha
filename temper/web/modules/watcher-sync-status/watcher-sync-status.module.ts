import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const watcherSyncStatus = {
  id: "01a0640f-8510-7f94-b946-33ea0f305e1f",
  type: "module",
  slug: "watcher-sync-status",
  definition: "how a player's watcher link compares with the data that link has carried",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A link being there is not data arriving.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Data without a link is a manual import rather than a watcher.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Data is stale once contact outruns capture by more than an hour.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A source with no capture instant reports no staleness.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An instant that cannot be read is passed over rather than returned.",
    },
  ],
} as const satisfies Module
