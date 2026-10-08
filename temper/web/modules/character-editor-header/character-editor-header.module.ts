import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const characterEditorHeader = {
  id: "01a0642c-5b86-784e-a52e-216b681ef987",
  type: "page-type/module",
  slug: "character-editor-header",
  definition: "the header the character editor carries",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
  ],
  createdAt: "2026-09-02T22:10:23.750Z",
  updatedAt: "2026-09-27T11:37:30.000Z",
} as const satisfies Module
