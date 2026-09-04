import type { TypeDeclaration } from "@akasha/code-system/type-declaration"

export const orderListBoxPublished = {
  id: "01a06207-bdf6-7c8f-8f0c-3a655587329d",
  pageTypeSlug: "type-declaration",
  slug: "order-list-box-published",
  definition: "the handler names this widget's XML calls the built Lua back through",
  d: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The XML and the name here are spelled the same way.",
    },
    {
      invariantKind: "departure",
      statement: "A handler is unset until the widget builds a row.",
    },
    {
      invariantKind: "absence",
      statement: "A compiler emits nothing from this file.",
    },
  ],
} as const satisfies TypeDeclaration
