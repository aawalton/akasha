import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const importResult = {
  id: "01a0640f-8510-79d2-a33e-1cfc18d185ee",
  type: "page-type/module",
  slug: "import-result",
  definition: "what a whole-account import did to the account, its characters and its companions",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A section the import did not know is counted rather than named.",
    },
  ],
  createdAt: "2026-09-02T21:38:53.840Z",
  updatedAt: "2026-09-15T18:44:13.000Z",
} as const satisfies Module
