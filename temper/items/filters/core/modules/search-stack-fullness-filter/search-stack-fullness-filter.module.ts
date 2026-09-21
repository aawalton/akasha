import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const searchStackFullnessFilter = {
  id: "01a0613a-e0ae-7c58-9f5e-7a0a707c9698",
  type: "page-type/module",
  slug: "search-stack-fullness-filter",
  definition: "whether an item stack is full, narrowed by a toggle between full and partial",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Exclude means a partial stack rather than anything short of a full stack.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here narrows the server request.",
    },
  ],
} as const satisfies Module
