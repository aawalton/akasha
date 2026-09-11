import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const achievementCatalogSchema = {
  id: "01a06076-5ea8-71a8-86ca-b64f4875777a",
  type: "module",
  slug: "achievement-catalog-schema",
  definition: "the zod schema reading the achievement catalog out of saved variables",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A category has sub categories that have achievements.",
    },
    {
      invariantKind: "departure",
      statement: "A general sub category is optional on a category.",
    },
    {
      invariantKind: "departure",
      statement: "An entry says whether the achievement is earned per character.",
    },
  ],
} as const satisfies Module
