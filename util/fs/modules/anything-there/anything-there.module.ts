import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const anythingThere = {
  id: "01a08e16-6dcf-7030-a111-e379d16e22f5",
  type: "module",
  slug: "anything-there",
  definition: "whether anything at all sits at a path, a link among them",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The path itself is read rather than whatever a link at it reaches.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A link reaching nothing is something there.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A read that throws for any reason answers that nothing is there.",
    },
  ],
} as const satisfies Module
