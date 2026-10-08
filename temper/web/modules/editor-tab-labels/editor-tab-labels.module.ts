import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const editorTabLabels = {
  id: "01a0642c-5b84-7439-b9ba-eebdb86d7a62",
  type: "page-type/module",
  slug: "editor-tab-labels",
  definition: "the labels the character editor's tabs carry",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each tab names the web phrase page its label is read from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The character and companion editors read the same tab label pages.",
    },
  ],
  createdAt: "2026-09-02T22:10:23.748Z",
  updatedAt: "2026-09-27T11:46:39.000Z",
} as const satisfies Module
