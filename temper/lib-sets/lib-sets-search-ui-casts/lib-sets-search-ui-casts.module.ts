import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const libSetsSearchUiCasts = {
  id: "01a0623c-2df8-71c1-ba4a-234f0ad1e08b",
  pageTypeSlug: "module",
  type: "module",
  slug: "lib-sets-search-ui-casts",
  definition: "the narrowings for the untyped values the search window handles",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every narrowing here is an unchecked cast.",
    },
  ],
} as const satisfies Module
