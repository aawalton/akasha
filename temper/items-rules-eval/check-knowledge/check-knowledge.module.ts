import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const checkKnowledge = {
  id: "01a06137-f965-7f9c-a6f1-3d941b423696",
  pageTypeSlug: "module",
  slug: "check-knowledge",
  definition: "the condition check over whether every character already knows an item",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Knowledge is decided across every character rather than the current character alone.",
    },
    {
      invariantKind: "departure",
      statement: "An item with no item key falls back to the client's own known flag.",
    },
    {
      invariantKind: "departure",
      statement: "A non-knowledge item with no item key fails rather than answering indeterminate.",
    },
    {
      invariantKind: "departure",
      statement: "The can-unlock condition is the negation of every character knowing the item.",
    },
  ],
} as const satisfies Module
