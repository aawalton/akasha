import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventorySafetyTypes = {
  id: "01a060c5-3c23-74f6-af7d-2a1dd331431c",
  type: "page-type/module",
  slug: "inventory-safety-types",
  definition: "the actions a player must agree to before they run",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An action with an item action page is named by that page's title.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "Buying has no item action page, so its label is kept here.",
    },
  ],
} as const satisfies Module
