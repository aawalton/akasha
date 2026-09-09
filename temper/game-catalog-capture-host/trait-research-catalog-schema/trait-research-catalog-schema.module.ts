import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const traitResearchCatalogSchema = {
  id: "01a06076-5ea9-7eaa-9ac6-2b3b92426d46",
  pageTypeSlug: "module",
  slug: "trait-research-catalog-schema",
  definition: "the zod schema reading the trait research catalog out of saved variables",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A craft type has research lines that have traits.",
    },
    {
      invariantKind: "departure",
      statement: "A trait has only its name.",
    },
    {
      invariantKind: "departure",
      statement: "A catalog key arrives as text and is coerced to a number.",
    },
  ],
} as const satisfies Module
