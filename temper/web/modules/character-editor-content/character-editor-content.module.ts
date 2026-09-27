import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const characterEditorContent = {
  id: "01a06589-8d61-7000-ba09-7e4fd000c64c",
  type: "page-type/module",
  slug: "character-editor-content",
  definition: "the body of the character editor",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A remix that fails shows no error's own text, which goes to the console.",
    },
  ],
} as const satisfies Module
