import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const craftingMaterialActions = {
  id: "01a06100-3bea-776e-bce8-156c6ba94357",
  pageTypeSlug: "module",
  slug: "crafting-material-actions",
  definition:
    "what becomes of each crafting material, worked out from the rules over the material tree",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A material no rule reaches is left where the material lies.",
    },
  ],
} as const satisfies Module
