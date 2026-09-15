import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventorySettingsAccess = {
  id: "01a068e2-226b-7907-a0c2-a9e64c63d2ac",
  type: "module",
  slug: "inventory-settings-access",
  definition: "the inventory and automation settings a command reads and writes for a player",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A player's rules are read from that player's rule pages.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A rule a command changes is written back as a page of its own.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A rule page no rule wants is taken away in the same write.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A player is found by the account the title has.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A slice that is not there reads as an empty slice rather than refusing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A player's item rules and buy rules are read from the settings blob.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A read is checked against the settings shape.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A write lands every settings key but the rules in the blob beside the page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The automation settings live under one settings key.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The settings blob is asked for under `files`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A blob answering as its file's ending is refused rather than read as unset.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A blob that is no JSON object is refused rather than read as unset.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A slice that is there and is no object is refused rather than read as unset.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A write lands the blob beside the page rather than under a key on the page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A write carries the whole blob merged onto the blob last read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A blob is written indented.",
    },
  ],
} as const satisfies Module
