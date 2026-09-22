import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventorySettingsTypes = {
  id: "01a06100-3bf0-7056-8b1b-26f75a65bb5f",
  type: "page-type/module",
  slug: "inventory-settings-types",
  definition: "the shape of the inventory settings a player keeps, beside each one's default",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every setting has a default stated here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A timestamp records when a settings group was last worked out.",
    },
  ],
} as const satisfies Module
