import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const completionInputSchema = {
  id: "01a060d7-c8ce-7583-8247-676a8ee7d0c5",
  type: "module",
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
      statement: "The reading names fields without saying any field's meaning.",
    },
  ],
} as const satisfies Module
