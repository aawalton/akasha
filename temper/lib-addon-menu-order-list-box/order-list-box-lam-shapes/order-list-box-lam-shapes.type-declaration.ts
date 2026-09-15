import type { TypeDeclaration } from "akasha/code/type-declaration/type-declaration.page-type.types.ts"

export const orderListBoxLamShapes = {
  id: "01a06207-bdf5-7baa-a829-0e6f87895d8c",
  type: "page-type/type-declaration",
  slug: "order-list-box-lam-shapes",
  definition: "what this widget adds to the menu library it plugs into",
  d: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name here is the menu library's own and is never renamed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The library global is merged rather than declared a second time.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A compiler emits nothing from this file.",
    },
  ],
} as const satisfies TypeDeclaration
