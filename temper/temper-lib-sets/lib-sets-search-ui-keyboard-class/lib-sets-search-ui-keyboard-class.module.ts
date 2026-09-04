import type { Module } from "@akasha/code-system/module"

export const libSetsSearchUiKeyboardClass = {
  id: "01a0623e-53a0-7c7c-9ac1-5e5f85c57505",
  pageTypeSlug: "module",
  slug: "lib-sets-search-ui-keyboard-class",
  definition: "the class the keyboard search window's objects are made from",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The class is also placed on the game global as LibSets_SearchUI_Keyboard.",
    },
    {
      invariantKind: "departure",
      statement: "A further view of this class is typed for overriding.",
    },
  ],
} as const satisfies Module
