import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const loreLibraryCatalogSchema = {
  id: "01a06076-5ea6-7a4a-ba5c-9b141b2fa0e4",
  pageTypeSlug: "module",
  slug: "lore-library-catalog-schema",
  definition: "the zod schema reading the lore library catalog out of saved variables",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A category holds collections that hold books.",
    },
    {
      invariantKind: "departure",
      statement: "A book carries only its name.",
    },
    {
      invariantKind: "departure",
      statement: "A catalog key arrives as text and is coerced to a number.",
    },
    {
      invariantKind: "departure",
      statement: "Each level is checked against its shape in `temper-capture-shapes`.",
    },
  ],
} as const satisfies Module
