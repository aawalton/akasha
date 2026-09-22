import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const categoryMatch = {
  id: "01a06137-f962-7e16-b493-859ad858c122",
  type: "page-type/module",
  slug: "category-match",
  definition:
    "the answer to whether a compiled rule's category id appears in an item's category chain",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An absent category chain answers unknown rather than answering mismatch.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A match is plain equality between the rule category id and one node id in the chain.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here consults the category tree.",
    },
  ],
} as const satisfies Module
