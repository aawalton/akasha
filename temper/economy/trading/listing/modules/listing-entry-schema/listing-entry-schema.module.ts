import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const listingEntrySchema = {
  id: "01a060a7-02f2-7466-b06e-20c2ad62c6f6",
  type: "page-type/module",
  slug: "listing-entry-schema",
  definition: "the zod parse a saved guild store listing must pass",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A field the shape does not name makes the parse fail.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The parse and the listing shape are held equal at typecheck.",
    },
  ],
} as const satisfies Module
