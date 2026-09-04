import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const inventorySettingsTypes = {
  id: "01a06100-3bf0-7056-8b1b-26f75a65bb5f",
  pageTypeSlug: "module",
  slug: "inventory-settings-types",
  definition:
    "the shape of the inventory settings a player keeps, beside the defaults each falls back on",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every setting carries a default stated here.",
    },
    {
      invariantKind: "departure",
      statement: "A timestamp records when a settings group was last worked out.",
    },
  ],
} as const satisfies Module
