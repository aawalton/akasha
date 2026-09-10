import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const useDestinationContextBuilder = {
  id: "01a06100-3c01-7ef0-942b-121ee94162c9",
  pageTypeSlug: "module",
  slug: "use-destination-context-builder",
  definition:
    "what an item teaches, and the reader of who already knows it, built from the matcher context",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An item teaching nothing has no use key.",
    },
    {
      invariantKind: "departure",
      statement: "A master motif is known only where every chapter of the style is known.",
    },
  ],
} as const satisfies Module
