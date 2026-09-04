import type { Module } from "@akasha/code-system/module"

export const knowledgeLdei = {
  id: "01a0621c-516c-7e6c-b88e-6a86a6f54d21",
  pageTypeSlug: "module",
  slug: "knowledge-ldei",
  definition: "one character's knowledge wrapped as text another account can read",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A share is held to what one edit box carries.",
    },
  ],
} as const satisfies Module
