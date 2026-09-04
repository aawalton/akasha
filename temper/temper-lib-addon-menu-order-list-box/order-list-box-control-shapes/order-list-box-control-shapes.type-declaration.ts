import type { TypeDeclaration } from "@akasha/code-system/type-declaration"

export const orderListBoxControlShapes = {
  id: "01a06207-bdf0-718b-9625-7685969b57ec",
  pageTypeSlug: "type-declaration",
  slug: "order-list-box-control-shapes",
  definition:
    "the control and dialog shapes this widget builds that the shared game types leave out",
  d: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A name here is the game's own or another library's and is never renamed.",
    },
    {
      invariantKind: "departure",
      statement: "A name the shared game typings already declare is left out of this file.",
    },
    {
      invariantKind: "absence",
      statement: "A compiler emits nothing from this file.",
    },
  ],
} as const satisfies TypeDeclaration
