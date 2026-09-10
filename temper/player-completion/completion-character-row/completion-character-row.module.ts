import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const completionCharacterRow = {
  id: "01a06108-2fee-7a2e-b1b8-6d8bc1327536",
  pageTypeSlug: "module",
  slug: "completion-character-row",
  definition: "one character of a player's roster as the completion store keeps it",
  code: "ts",
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing here runs.",
    },
  ],
} as const satisfies Module
