import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionCatalogGate = {
  id: "01a0de52-ecc2-7855-b5fc-62aeebb0e107",
  type: "page-type/module",
  slug: "companion-catalog-gate",
  definition: "what shows its content only once the companion catalogue is read",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Until the catalogue is read the screen draws what it is handed to draw instead.",
    },
  ],
} as const satisfies Module
