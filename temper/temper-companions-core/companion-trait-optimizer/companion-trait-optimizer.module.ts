import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const companionTraitOptimizer = {
  id: "01a06152-c2d8-7ee7-bc88-0ef2a11913d0",
  pageTypeSlug: "module",
  slug: "companion-trait-optimizer",
  definition: "trait assignment search over the empty trait slots of a companion build",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Quickened and focused are enumerated exhaustively while other traits fill greedily.",
    },
    {
      invariantKind: "departure",
      statement: "A hill-climbing pass swaps traits between gold rings and other slots.",
    },
    {
      invariantKind: "constraint",
      statement: "Only ring-1 and ring-2 count as gold slots.",
    },
  ],
} as const satisfies Module
