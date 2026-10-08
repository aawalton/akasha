import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const statsPanel = {
  id: "01a0642c-5bbd-7439-bf0b-b3a865e8b977",
  type: "page-type/module",
  slug: "stats-panel",
  definition: "the panel with a character's stats",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
  ],
  createdAt: "2026-09-02T22:10:23.805Z",
  updatedAt: "2026-09-27T11:45:20.000Z",
} as const satisfies Module
