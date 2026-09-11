import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const pricingPostAnswer = {
  id: "01a090c4-43b0-786e-815e-1f7e9f75944e",
  pageTypeSlug: "module",
  slug: "pricing-post-answer",
  definition: "the answer a watcher's pricing post is given where none is kept",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A body of the shape the caller names is answered 410 rather than kept.",
    },
    {
      invariantKind: "departure",
      statement: "A body of another shape is refused before the watcher token is read.",
    },
  ],
} as const satisfies Module
