import type { TypeDeclaration } from "akasha/code/type-declaration/type-declaration.page-type.types.ts"

export const orderListBoxShape = {
  id: "01a06207-bdf8-746c-ad6e-67efcc323489",
  type: "page-type/type-declaration",
  slug: "order-list-box-shape",
  definition: "the data a caller hands in and the shapes the widget's controls carry",
  d: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A value a caller hands in is either the value or a function answering that value.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file reaching a name here states no import.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A compiler emits nothing from this file.",
    },
  ],
} as const satisfies TypeDeclaration
