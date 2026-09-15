import type { TypeDeclaration } from "akasha/code/type-declaration/type-declaration.page-type.types.ts"

export const orderListBoxControlShapes = {
  id: "01a06207-bdf0-718b-9625-7685969b57ec",
  type: "page-type/type-declaration",
  slug: "order-list-box-control-shapes",
  definition:
    "the control and dialog shapes this widget builds that the shared game types leave out",
  d: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A name here is the game's own or another library's and is never renamed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name the shared game types already declare is left out of this file.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A compiler emits nothing from this file.",
    },
  ],
} as const satisfies TypeDeclaration
