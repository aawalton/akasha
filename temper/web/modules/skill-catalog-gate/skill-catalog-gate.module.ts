import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const skillCatalogGate = {
  id: "01a0de7a-2f36-784f-bdd2-ba06f5ae41bf",
  type: "page-type/module",
  slug: "skill-catalog-gate",
  definition: "what shows its content only once the skill catalogue is read",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Until the catalogue is read the screen shows what it is handed to show instead.",
    },
  ],
} as const satisfies Module
