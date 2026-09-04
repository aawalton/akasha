import type { Module } from "@akasha/code-system/module"

export const orderListBoxCasts = {
  id: "01a06207-bdee-719b-9def-b29a859b1aaa",
  pageTypeSlug: "module",
  slug: "order-list-box-casts",
  definition: "the narrowings from an untyped game value to a shape this widget reads",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A narrowing here asserts a shape rather than checking one.",
    },
    {
      invariantKind: "departure",
      statement: "A caller narrowing a game value states which shape the caller expects.",
    },
  ],
} as const satisfies Module
