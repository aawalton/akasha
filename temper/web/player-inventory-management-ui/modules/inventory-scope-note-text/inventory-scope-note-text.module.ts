import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryScopeNoteText = {
  id: "01a0636c-5d9b-798b-bb3f-1e3e2f0e002b",
  type: "page-type/module",
  slug: "inventory-scope-note-text",
  definition: "the words saying what an inventory count leaves out",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every word of the note is a web phrase page, read through the phrase passed in.",
    },
  ],
} as const satisfies Module
