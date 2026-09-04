import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const completionInputSchema = {
  id: "01a060d7-c8ce-7583-8247-676a8ee7d0c5",
  pageTypeSlug: "module",
  slug: "completion-input-schema",
  definition:
    "a tolerant reading of what the addon wrote for an account or a character or a companion",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A field that will not parse falls away rather than failing the record.",
    },
    {
      invariantKind: "departure",
      statement: "A record the reading rejects whole comes back as the record went in.",
    },
    {
      invariantKind: "departure",
      statement: "A key the reading does not name is kept.",
    },
    {
      invariantKind: "gap",
      statement: "The reading names fields without saying what any field means.",
    },
  ],
} as const satisfies Module
