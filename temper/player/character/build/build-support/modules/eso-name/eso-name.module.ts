import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const esoName = {
  id: "01a0609f-53f9-7998-8f89-ccf5a230130b",
  type: "page-type/module",
  slug: "eso-name",
  definition: "a name the game gave, with the game's own grammar suffix cut off",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A suffix the game wrote after a caret is cut from the end of the name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caret anywhere but the end of the name is left alone.",
    },
  ],
  createdAt: "2026-09-02T05:37:29.593Z",
  updatedAt: "2026-09-21T15:42:49.000Z",
} as const satisfies Module
