import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const useInventoryRulesFilter = {
  id: "01a0636c-5da1-76f1-aacf-afb23f4b0064",
  type: "page-type/module",
  slug: "use-inventory-rules-filter",
  definition: "the rules narrowed to a reader's ask",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Rules are searched and sorted again when the item action page titles change.",
    },
  ],
} as const satisfies Module
