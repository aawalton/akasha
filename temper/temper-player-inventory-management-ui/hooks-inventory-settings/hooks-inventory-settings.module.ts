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
      statement: "The rules a player holds are read from the rule pages of that player's account.",
    },
    {
      invariantKind: "departure",
      statement: "A rule a player changes is written back as a page of its own.",
    },
    {
      invariantKind: "departure",
      statement: "A rule page no rule wants any more is taken away in the same save.",
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
      invariantKind: "gap",
      statement: "The settings blob answers with the ending of its file rather than its body.",
    },
  ],
} as const satisfies Module
