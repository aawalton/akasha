import type { Module } from "@akasha/code-system/module"

export const libSetsSearchUiSearchuiIndex = {
  id: "01a0623e-53a2-77a4-8fe3-d86ebd012700",
  pageTypeSlug: "module",
  slug: "lib-sets-search-ui-searchui-index",
  definition: "the ordered side-effect imports of the search window's modules",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The order these modules are loaded in is the order their effects happen.",
    },
  ],
} as const satisfies Module
