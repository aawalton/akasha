import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const motifChapterSet = {
  id: "01a060c5-3c25-71a5-8ae6-6300f17e08b1",
  type: "page-type/module",
  slug: "motif-chapter-set",
  definition: "the motif chapters each style has, read off the lore library",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A motif is keyed by the number its book names, never by the game's item style id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A known master book teaches every chapter of its motif.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The addon, the planner and the tooltip read motif knowledge through this module.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The chapters are read off the lore library held, and read again once it changes.",
    },
  ],
  createdAt: "2026-09-02T06:18:53.861Z",
  updatedAt: "2026-09-27T10:40:28.000Z",
} as const satisfies Module
