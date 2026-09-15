import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventorySettingsHandle = {
  id: "01a068f6-dedf-7107-8dc8-aa181b13b60d",
  type: "page-type/module",
  slug: "inventory-settings-handle",
  definition: "the inventory and automation settings bound to the signed-in player",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Settings are read and written for the signed-in player rather than a named player.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Reading and writing are handed over together as one handle.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No setting is shaped or defaulted here.",
    },
  ],
} as const satisfies Module
