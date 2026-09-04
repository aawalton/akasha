import type { Module } from "@akasha/code-system/module"

export const libSetsSearchUiKeyboardSearchHandlers = {
  id: "01a0623e-53a2-795c-a58f-b22803610c4d",
  pageTypeSlug: "module",
  slug: "lib-sets-search-ui-keyboard-search-handlers",
  definition: "the keyboard top-level window's answers to being created, moved and resized",
  code: "ts",
  invariants: [
    { invariantKind: "constraint", statement: "Each published name is fixed." },
    {
      invariantKind: "constraint",
      statement: "The window object is made once on the first initialize event.",
    },
  ],
} as const satisfies Module
