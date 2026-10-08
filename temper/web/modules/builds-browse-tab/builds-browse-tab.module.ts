import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const buildsBrowseTab = {
  id: "01a0642c-5b8f-74e0-93ce-35ce478bf46e",
  type: "page-type/module",
  slug: "builds-browse-tab",
  definition: "the tab browsing character builds",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
  ],
  createdAt: "2026-09-02T22:10:23.759Z",
  updatedAt: "2026-09-27T11:47:27.000Z",
} as const satisfies Module
