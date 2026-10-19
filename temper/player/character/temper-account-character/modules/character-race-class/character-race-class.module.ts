import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const characterRaceClass = {
  id: "01a15681-d9a2-793a-869c-8bd071379f24",
  type: "page-type/module",
  slug: "character-race-class",
  definition: "the race and class page a capture's game ids name",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A game id the catalog names no page for leaves that property unwritten.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No character is written as having no race or no class.",
    },
  ],
  createdAt: "2026-10-19T23:31:52.865Z",
  updatedAt: "2026-10-19T23:31:52.865Z",
} as const satisfies Module
