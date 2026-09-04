import type { Module } from "@akasha/code-system/module"

export const watcherSyncStatus = {
  id: "01a0640f-8510-7f94-b946-33ea0f305e1f",
  pageTypeSlug: "module",
  slug: "watcher-sync-status",
  definition: "how a player's watcher link compares with the data that link has carried",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A link being there is not data arriving.",
    },
    {
      invariantKind: "departure",
      statement: "Data without a link is a manual import rather than a watcher.",
    },
    {
      invariantKind: "departure",
      statement: "Data is stale once contact outruns capture by more than an hour.",
    },
    {
      invariantKind: "departure",
      statement: "A source carrying no capture instant reports no staleness.",
    },
    {
      invariantKind: "departure",
      statement: "An instant that cannot be read is passed over rather than returned.",
    },
  ],
} as const satisfies Module
