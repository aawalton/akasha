import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const recipeCatalogGate = {
  id: "01a0de64-3221-7119-9a0d-f29ee3b7ba8f",
  type: "page-type/module",
  slug: "recipe-catalog-gate",
  definition: "what shows its content only once the recipe catalogue is read",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Until the catalogue is read the screen shows what it is handed instead.",
    },
  ],
} as const satisfies Module
