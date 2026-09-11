import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const evalResult = {
  id: "01a06137-f96c-798a-8f82-d7f113caafb0",
  type: "module",
  slug: "eval-result",
  definition: "the recorded result of evaluating a compiled rule list against one item",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every rejection has a reason naming which stage rejected the rule.",
    },
    {
      invariantKind: "departure",
      statement:
        "An indeterminate outcome keeps every indeterminate rule found ahead of the first match.",
    },
    {
      invariantKind: "departure",
      statement:
        "A match found after an indeterminate rule is recorded only as a provisional match.",
    },
    {
      invariantKind: "departure",
      statement:
        "An item no rule matches gets an implicit terminal outcome with the action nothing.",
    },
  ],
} as const satisfies Module
