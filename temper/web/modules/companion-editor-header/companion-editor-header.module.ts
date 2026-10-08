import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionEditorHeader = {
  id: "01a0642f-8c36-7da9-a4d9-03b20ba5fade",
  type: "page-type/module",
  slug: "companion-editor-header",
  definition: "the header a companion's editor draws",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
  ],
  createdAt: "2026-09-02T22:13:52.822Z",
  updatedAt: "2026-09-27T11:27:07.000Z",
} as const satisfies Module
