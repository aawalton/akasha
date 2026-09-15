import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const checkKnowledge = {
  id: "01a06137-f965-7f9c-a6f1-3d941b423696",
  type: "module",
  slug: "check-knowledge",
  definition: "the condition check over whether every character already knows an item",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Knowledge is decided across every character rather than the current character alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An item with no item key falls back to the client's own known flag.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A non-knowledge item with no item key fails rather than answering indeterminate.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The can-unlock condition is the negation of every character knowing the item.",
    },
  ],
} as const satisfies Module
