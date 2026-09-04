import type { Module } from "@akasha/code-system/module"

export const inventorySettingsAccess = {
  id: "01a068e2-226b-7907-a0c2-a9e64c63d2ac",
  pageTypeSlug: "module",
  slug: "inventory-settings-access",
  definition: "the inventory and automation settings held on a player's own page",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Both slices live under one settings key on one player page.",
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
      invariantKind: "gap",
      statement: "The page store refuses every keyed write, so no setting is kept.",
    },
    {
      invariantKind: "departure",
      statement: "A slice is assembled before the refusal so a rule that cannot be held is caught.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal says how much went unkept rather than only that it refused.",
    },
  ],
} as const satisfies Module
