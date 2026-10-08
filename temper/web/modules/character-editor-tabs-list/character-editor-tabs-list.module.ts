import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const characterEditorTabsList = {
  id: "01a0642c-5b87-7905-916b-30572f40b7dd",
  type: "page-type/module",
  slug: "character-editor-tabs-list",
  definition: "the tabs the character editor lists",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its tab labels are read from the shared editor tab label phrase pages.",
    },
  ],
  createdAt: "2026-09-02T22:10:23.751Z",
  updatedAt: "2026-09-27T11:47:23.000Z",
} as const satisfies Module
