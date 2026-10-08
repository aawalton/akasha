import type { TypeDeclaration } from "akasha/code/type-declaration/type-declaration.page-type.types.ts"

export const esoOptionsMenu = {
  id: "01a06259-bfbb-741e-b9cc-630b4b8a9583",
  type: "page-type/type-declaration",
  slug: "eso-options-menu",
  definition: "the game's settings menu names that more than one add-on reaches",
  d: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A name here keeps the spelling the game gives that name.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "One declaration here serves every package reaching the name.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A compiler emits nothing from this file.",
    },
  ],
  createdAt: "2026-09-02T13:40:44.091Z",
  updatedAt: "2026-09-21T15:28:07.000Z",
} as const satisfies TypeDeclaration
