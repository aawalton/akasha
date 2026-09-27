import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionEditorContent = {
  id: "01a06589-8d86-7000-8a60-baa19b2c6ff2",
  type: "page-type/module",
  slug: "companion-editor-content",
  definition: "the body of the companion editor",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
  ],
} as const satisfies Module
