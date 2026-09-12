import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const companionsScanUpgrades = {
  id: "01a0611d-84e0-75d4-aece-dd01e386f389",
  type: "module",
  slug: "companions-scan-upgrades",
  definition: "which slots a companion could improve from what it already holds",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Only gear already in the companion's inventory is offered.",
    },
  ],
} as const satisfies Module
