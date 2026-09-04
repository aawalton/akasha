import type { Module } from "@akasha/code-system/module"

export const companionQolSavedVariables = {
  id: "01a0611d-84cc-7974-969f-8cbccd74d0f6",
  pageTypeSlug: "module",
  slug: "companion-qol-saved-variables",
  definition: "opening the quality-of-life settings account-wide or per character",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Switching between account-wide and per character carries the current settings over.",
    },
  ],
} as const satisfies Module
