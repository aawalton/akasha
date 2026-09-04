import type { TypeDeclaration } from "@akasha/code-system/type-declaration"

export const orderListBoxShape = {
  id: "01a06207-bdf8-746c-ad6e-67efcc323489",
  pageTypeSlug: "type-declaration",
  slug: "order-list-box-shape",
  definition: "the data a caller hands in and the shapes the widget's controls carry",
  d: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A value a caller hands in is either the value or a function answering it.",
    },
    {
      invariantKind: "departure",
      statement: "A file reaching a name here states no import.",
    },
    {
      invariantKind: "absence",
      statement: "A compiler emits nothing from this file.",
    },
  ],
} as const satisfies TypeDeclaration
