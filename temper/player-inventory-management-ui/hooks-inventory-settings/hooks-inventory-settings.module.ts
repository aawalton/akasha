import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const hooksInventorySettings = {
  id: "01a0636c-5d97-7966-a4c8-930054ce000c",
  pageTypeSlug: "module",
  slug: "hooks-inventory-settings",
  definition: "one player's inventory settings, read and written for a browser",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The rules a player has are read from the rule pages of that player's account.",
    },
    {
      invariantKind: "departure",
      statement: "A rule a player changes is written back as a page of its own.",
    },
    {
      invariantKind: "departure",
      statement: "A rule page no rule wants is taken away in the same save.",
    },
    {
      invariantKind: "absence",
      statement: "No rule reaches the settings blob.",
    },
    {
      invariantKind: "gap",
      statement: "The item rules and the buy rules are still read from the settings blob.",
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
      statement: "One copy of the blob is held here.",
    },
    {
      invariantKind: "departure",
      statement:
        "A write carries the whole blob merged onto the blob last read rather than one panel's section.",
    },
    {
      invariantKind: "departure",
      statement:
        "The panels outside this package read this copy rather than opening a second copy.",
    },
    {
      invariantKind: "departure",
      statement: "Every panel reads that copy.",
    },
    {
      invariantKind: "departure",
      statement: "A write before the blob is read is refused.",
    },
  ],
} as const satisfies Module
