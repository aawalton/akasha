import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const searchTraitFilter = {
  id: "01a0613a-e0b1-71f5-bbae-52bb501cef6f",
  pageTypeSlug: "module",
  slug: "search-trait-filter",
  definition:
    "the item trait, narrowed by a multiselect of weapon, armor, jewelry, and companion traits",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The trait filter also adds the ESO numbers for the selected traits to the server request.",
    },
    {
      invariantKind: "departure",
      statement: "Trait options are deduplicated by trait id across the four trait lists.",
    },
    {
      invariantKind: "departure",
      statement: "An ESO trait number of zero is left out of the server terms.",
    },
  ],
} as const satisfies Module
