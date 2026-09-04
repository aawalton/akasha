import type { Module } from "@akasha/code-system/module"

export const watcherSettingsConsumables = {
  id: "01a06381-35cf-73a4-9d73-0f0667286acb",
  pageTypeSlug: "module",
  slug: "watcher-settings-consumables",
  definition:
    "the consumables a build asks for, the stock held of them, and the inventory snapshot behind both",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A character with no target build wants no consumable.",
    },
    {
      invariantKind: "departure",
      statement: "The wanted list and the stock are worked out by the code the web matcher uses.",
    },
    {
      invariantKind: "departure",
      statement: "Item stock and wanted lists are answered as plain objects keyed by item id.",
    },
    {
      invariantKind: "departure",
      statement: "The latest snapshot is the one captured last.",
    },
    {
      invariantKind: "departure",
      statement: "Only the keys a read uses are asked of a snapshot row.",
    },
    {
      invariantKind: "departure",
      statement: "An inventory that cannot be read is answered as a failure rather than raised.",
    },
    {
      invariantKind: "departure",
      statement: "A failure names the snapshot at fault and what was wrong with that snapshot.",
    },
    {
      invariantKind: "departure",
      statement: "Buy stock is unavailable and empty where no snapshot could be read.",
    },
    {
      invariantKind: "departure",
      statement: "Chunks are joined in the order of their chunk index.",
    },
    {
      invariantKind: "departure",
      statement:
        "A chunk count the snapshot declares that the chunk rows do not match is a failure.",
    },
    {
      invariantKind: "departure",
      statement: "Settings not marked version 2 are answered as an empty version 2 rule set.",
    },
    {
      invariantKind: "departure",
      statement:
        "The character reader and the inventory row reader are handed in rather than fixed.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a page.",
    },
  ],
} as const satisfies Module
