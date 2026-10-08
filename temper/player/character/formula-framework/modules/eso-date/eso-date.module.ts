import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const esoDate = {
  id: "01a06070-82e2-764c-be2a-e7c281e7063e",
  type: "page-type/module",
  slug: "eso-date",
  definition: "today's date on the game's own clock",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "Lua compiled for the game reaches no Date.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller of this module runs on a host rather than inside the game.",
    },
  ],
  createdAt: "2026-09-02T04:46:21.410Z",
  updatedAt: "2026-09-21T15:41:15.000Z",
} as const satisfies Module
