import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryScopeNote = {
  id: "01a0636c-5d9b-746a-a413-06012757002c",
  type: "page-type/module",
  slug: "inventory-scope-note",
  definition: "the note saying what an inventory count leaves out",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The note hands the web phrase reader to the words it shows.",
    },
  ],
  createdAt: "2026-09-02T18:40:41.371Z",
  updatedAt: "2026-09-27T11:43:09.000Z",
} as const satisfies Module
