import type { Module } from "@akasha/code-system/module"

export const libSetsSearchUiSharedRowmenu = {
  id: "01a0623e-539f-7075-a2eb-753df899c48d",
  pageTypeSlug: "module",
  slug: "lib-sets-search-ui-shared-rowmenu",
  definition: "the menu a result row opens under the right mouse button",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The menu does not open unless LibScrollableMenu is present.",
    },
  ],
} as const satisfies Module
