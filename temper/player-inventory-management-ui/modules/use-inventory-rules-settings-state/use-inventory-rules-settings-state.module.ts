import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const useInventoryRulesSettingsState = {
  id: "01a0636c-5da1-7d24-92b7-2d9551ec0065",
  type: "module",
  slug: "use-inventory-rules-settings-state",
  definition: "the inventory rule settings a reader is editing",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A write refused for unread rules is told apart from one that failed to save.",
    },
    {
      invariantKind: "departure",
      statement: "A reader is told nothing was saved and nothing was lost, rather than to retry.",
    },
  ],
} as const satisfies Module
