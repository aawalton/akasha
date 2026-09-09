import type { Module } from "@akasha/code/module"

export const inventorySettingsAccess = {
  id: "01a068e2-226b-7907-a0c2-a9e64c63d2ac",
  pageTypeSlug: "module",
  slug: "inventory-settings-access",
  definition: "the inventory and automation settings a command reads and writes for a player",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A player's rules are read from that player's rule pages.",
    },
    {
      invariantKind: "departure",
      statement: "A rule a command changes is written back as a page of its own.",
    },
    {
      invariantKind: "departure",
      statement: "A rule page no rule wants is taken away in the same write.",
    },
    {
      invariantKind: "departure",
      statement: "A player is found by the account the title has.",
    },
    {
      invariantKind: "departure",
      statement: "A slice that is not there reads as an empty slice rather than refusing.",
    },
    {
      invariantKind: "departure",
      statement:
        "A write with an item rule or a buy rule is refused naming how many rules the write has.",
    },
    {
      invariantKind: "departure",
      statement: "The automation settings live under one settings key.",
    },
    {
      invariantKind: "departure",
      statement: "The settings blob is asked for under `files`.",
    },
    {
      invariantKind: "departure",
      statement: "A blob answering as its file's ending is refused rather than read as unset.",
    },
    {
      invariantKind: "departure",
      statement: "A write lands the blob beside the page rather than under a key on the page.",
    },
    {
      invariantKind: "departure",
      statement: "A write carries the whole blob merged onto the blob last read.",
    },
    {
      invariantKind: "departure",
      statement: "A blob is written indented, so a change to one setting diffs as a few lines.",
    },
  ],
} as const satisfies Module
