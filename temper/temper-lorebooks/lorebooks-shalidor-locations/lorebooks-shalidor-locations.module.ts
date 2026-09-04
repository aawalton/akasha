import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const lorebooksShalidorLocations = {
  id: "01a06184-3d7c-7388-9f04-084ca5cea38a",
  pageTypeSlug: "module",
  slug: "lorebooks-shalidor-locations",
  definition: "the whole Shalidor's Library location table, gathered from its runs in order",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The runs are gathered in the order the whole table names.",
    },
    {
      invariantKind: "gap",
      statement: "Akasha holds no map pin for a lore book.",
    },
  ],
} as const satisfies Module
