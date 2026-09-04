import type { Module } from "@akasha/code-system/module"

export const orderListBoxState = {
  id: "01a06207-bdf9-7a09-870c-479a20bc8a98",
  pageTypeSlug: "module",
  slug: "order-list-box-state",
  definition: "the library handles this widget holds and the one cursor control it shares",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every order list box on the panel shares one cursor control.",
    },
    {
      invariantKind: "departure",
      statement: "A widget is counted so each one is named apart from the rest.",
    },
  ],
} as const satisfies Module
