import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const antiquityLoreCatalogSchema = {
  id: "01a06076-5ea5-7559-8362-c4ea6704e72a",
  pageTypeSlug: "module",
  slug: "antiquity-lore-catalog-schema",
  definition: "the zod schema reading the antiquity lore catalog out of saved variables",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A catalog key arrives as text and is coerced to a number.",
    },
    {
      invariantKind: "departure",
      statement: "An entry carrying a field the schema does not name is refused.",
    },
    {
      invariantKind: "departure",
      statement: "The inferred type is checked against the shape in `temper-capture-shapes`.",
    },
  ],
} as const satisfies Module
