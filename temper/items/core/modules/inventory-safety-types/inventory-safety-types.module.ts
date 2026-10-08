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
      statement: "Each action names the page type whose page titles it: item action or buy action.",
    },
  ],
  createdAt: "2026-09-02T06:18:53.859Z",
  updatedAt: "2026-09-27T10:35:57.000Z",
} as const satisfies Module
