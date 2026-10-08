import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const craftingMaterialActions = {
  id: "01a06100-3bea-776e-bce8-156c6ba94357",
  type: "page-type/module",
  slug: "crafting-material-actions",
  definition:
    "what becomes of each crafting material, worked out from the rules over the material tree",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A material no rule reaches is left where the material lies.",
    },
  ],
  createdAt: "2026-09-02T07:23:20.426Z",
  updatedAt: "2026-09-21T15:44:44.000Z",
} as const satisfies Module
