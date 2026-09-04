import type { Module } from "@akasha/code-system/module"

export const orderListBoxConstants = {
  id: "01a06207-bdef-7f81-9b52-c6df27e5e358",
  pageTypeSlug: "module",
  slug: "order-list-box-constants",
  definition: "the names, textures, sizes and translated words this widget uses",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A control name is built from a template the widget counter fills.",
    },
    {
      invariantKind: "departure",
      statement: "A language the widget has no words for falls back to English.",
    },
  ],
} as const satisfies Module
