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
} as const satisfies Module
