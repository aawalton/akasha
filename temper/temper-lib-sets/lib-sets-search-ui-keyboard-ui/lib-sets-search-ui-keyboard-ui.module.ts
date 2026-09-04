import type { Module } from "@akasha/code-system/module"

export const libSetsSearchUiKeyboardUi = {
  id: "01a0623e-53a1-77ae-ba00-994d8a505f03",
  pageTypeSlug: "module",
  slug: "lib-sets-search-ui-keyboard-ui",
  definition: "what the keyboard search window does when it opens, resets or is moved",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The window's place and size are kept in the saved variables under searchUI.",
    },
    {
      invariantKind: "constraint",
      statement: "A saved size is never below the window's minimum width and height.",
    },
  ],
} as const satisfies Module
