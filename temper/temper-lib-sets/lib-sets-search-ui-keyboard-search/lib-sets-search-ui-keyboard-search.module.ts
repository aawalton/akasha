import type { Module } from "@akasha/code-system/module"

export const libSetsSearchUiKeyboardSearch = {
  id: "01a0623e-53a2-77b1-bac5-30921369d712",
  pageTypeSlug: "module",
  slug: "lib-sets-search-ui-keyboard-search",
  definition: "the search terms gathered from the keyboard window's dropdowns and text boxes",
  code: "ts",
  invariants: [
    { invariantKind: "constraint", statement: "Item ids matter only when a gear filter is set." },
  ],
} as const satisfies Module
