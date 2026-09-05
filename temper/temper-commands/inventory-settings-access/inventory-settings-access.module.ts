import type { Module } from "@akasha/code-system/module"

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
      statement: "A rule page no rule wants any more is taken away in the same write.",
    },
    {
      invariantKind: "departure",
      statement: "A player is found by the account the title carries.",
    },
    {
      invariantKind: "departure",
      statement: "A slice that is not there reads as the empty one rather than refusing.",
    },
    {
      invariantKind: "departure",
      statement: "A write carrying an item rule or a buy rule is refused by how many it carries.",
    },
    {
      invariantKind: "departure",
      statement:
        "The automation settings live under one settings key, and the page store refuses every keyed write.",
    },
    {
      invariantKind: "gap",
      statement: "No automation setting on the player page is kept.",
    },
    {
      invariantKind: "departure",
      statement: "A slice is assembled before the refusal so a rule that cannot be held is caught.",
    },
    {
      invariantKind: "departure",
      statement:
        "A refusal says how much went unkept rather than only that the page store refused.",
    },
  ],
} as const satisfies Module
