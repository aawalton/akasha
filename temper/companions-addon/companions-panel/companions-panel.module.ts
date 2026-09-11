import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const companionsPanel = {
  id: "01a0611d-84de-7c65-8411-3dd9d941484a",
  type: "module",
  slug: "companions-panel",
  definition: "the panel showing one companion's key and value rows",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Live rows are hidden while no companion is summoned.",
    },
  ],
} as const satisfies Module
