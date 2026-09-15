import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const hooksInventorySettings = {
  id: "01a0636c-5d97-7966-a4c8-930054ce000c",
  type: "module",
  slug: "hooks-inventory-settings",
  definition: "one player's inventory settings, read and written for a browser",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The rules a player has are read from the rule pages of that player's account.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A rule a player changes is written back as a page of its own.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A rule page no rule wants is taken away in the same save.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No rule reaches the settings blob.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "The item rules and the buy rules are still read from the settings blob.",
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
      statement: "One copy of the blob is held here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A write carries the whole blob merged onto the blob last read rather than one panel's section.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The panels outside this package read this copy rather than opening a second copy.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every panel reads that copy.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A write before the blob is read is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A rule the read refuses is handed on as the words that refusal said.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A write while any rule is unread is refused.",
    },
  ],
} as const satisfies Module
