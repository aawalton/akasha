import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const bulkSetEditTag = {
  id: "01a0642d-9a17-7914-a5e0-bc31c4a7d032",
  type: "page-type/module",
  slug: "bulk-set-edit-tag",
  definition: "a chip setting one gear set across every slot of a section at once",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The empty choice is named by the no-set catalog page.",
    },
  ],
} as const satisfies Module
