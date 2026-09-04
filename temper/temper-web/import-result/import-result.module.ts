import type { Module } from "@akasha/code-system/module"

export const importResult = {
  id: "01a0640f-8510-79d2-a33e-1cfc18d185ee",
  pageTypeSlug: "module",
  slug: "import-result",
  definition: "what a whole-account import did to the account, its characters and its companions",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A section the import did not know is counted rather than named.",
    },
  ],
} as const satisfies Module
