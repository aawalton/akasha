import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const libSetsSearchUiKeyboardSearchHandlers = {
  id: "01a0623e-53a2-795c-a58f-b22803610c4d",
  type: "page-type/module",
  slug: "lib-sets-search-ui-keyboard-search-handlers",
  definition: "the keyboard top-level window's answers to being created, moved and resized",
  code: "ts",
  decisions: [
    { decisionKind: "decision-kind/constraint", statement: "Each published name is fixed." },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The window object is made once on the first initialize event.",
    },
  ],
} as const satisfies Module
