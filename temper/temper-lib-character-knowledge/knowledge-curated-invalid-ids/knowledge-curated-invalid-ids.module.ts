import type { Module } from "@akasha/code-system/module"

export const knowledgeCuratedInvalidIds = {
  id: "01a0622b-dc57-7c4b-8f62-fa6a29f7844e",
  pageTypeSlug: "module",
  slug: "knowledge-curated-invalid-ids",
  definition: "the items kept out of the style and chapter tables",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "An item upstream marks unavailable contributes to no style.",
    },
  ],
} as const satisfies Module
