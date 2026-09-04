import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const achievementCatalogSchema = {
  id: "01a06076-5ea8-71a8-86ca-b64f4875777a",
  pageTypeSlug: "module",
  slug: "achievement-catalog-schema",
  definition: "the zod schema reading the achievement catalog out of saved variables",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A category holds sub categories that hold achievements.",
    },
    {
      invariantKind: "departure",
      statement: "A general sub category is optional on a category.",
    },
    {
      invariantKind: "departure",
      statement: "An entry says whether the achievement is earned per character.",
    },
    {
      invariantKind: "departure",
      statement: "The inferred type is checked against the shape in `temper-capture-shapes`.",
    },
  ],
} as const satisfies Module
