import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const saidBy = {
  id: "01a08dd6-adb6-77d6-8c13-b314dea2f9c9",
  pageTypeSlug: "module",
  type: "module",
  slug: "said-by",
  definition: "what a thrown thing says",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A thrown thing is read for a message.",
    },
    {
      invariantKind: "departure",
      statement: "A thrown thing is made to speak even where that thing is no Error.",
    },
  ],
} as const satisfies Module
